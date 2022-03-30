import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { PageRepositoryParams } from '.'
import BackButton from '../../components/BackButton'
import Card from '../../components/Card'
import Page from '../../components/Page'
import Tag from '../../components/Tag'
import { RootState } from '../../store'
import registryUrl from '../../utils/registryUrl'
import Page404 from '../404'

export interface PageTagParams extends PageRepositoryParams {
    tagName: string
}

export default function PageTag() {
    const { repositoryId, tagName }: PageTagParams = useParams()
    const repositories = useSelector((state: RootState) => state.docker.repositories)
    const repository = repositories.find(el => el.id === repositoryId)
    const tag = repository?.tags.find(el => el.name === tagName)

    if (! repository || ! tag) {
        return <Page404 />
    }

    return (
        <Page flex>
            <div
                style={{
                    maxWidth: "700px"
                }}
            >
                <BackButton />
                <Card>
                    <div>
                        <p className="text-4xl">{repository.name}</p>
                        <p className="text-2xl">{tag.name}</p>
                    </div>

                    <hr className="my-6" />

                    <div className="bg-gray-500 text-white p-4">
                        <pre className="whitespace-pre-wrap">
                            docker pull {registryUrl()}/{repository.name}:{tag.name}
                        </pre>
                    </div>

                    <hr className="my-6" />

                    <div className="flex gap-2 mb-6">
                        <Tag label={tag.architecture} />
                        <Tag label={`${tag.fsLayers.length} layer(s)`} />
                    </div>

                    <div className="flex flex-col">
                        {tag.fsLayers.map((layer, index) => (
                            <Link
                            to={`/r/${repository.id}/tag/${tag.name}/layer/${layer}`}
                                key={index}
                                className="
                                    bg-docker text-white
                                    p-3 mb-3
                                    shadow rounded
                                    transition-all hover:bg-blue-500 cursor-pointer
                                    flex justify-between items-center
                                "
                            >
                                {layer}
                            </Link>
                        ))}
                    </div>
                </Card>
            </div>
        </Page>
    )
}
