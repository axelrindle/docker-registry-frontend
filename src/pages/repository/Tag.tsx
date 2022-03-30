import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import Card from '../../components/Card'
import Page from '../../components/Page'
import { RootState } from '../../store'
import registryUrl from '../../utils/registryUrl'
import Page404 from '../404'

interface Params {
    repositoryName: string
    tagName: string
}

export default function Tag() {
    const { repositoryName, tagName }: Params = useParams()
    const repositories = useSelector((state: RootState) => state.docker.repositories)
    const repository = repositories.find(el => el.name === repositoryName)
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
                        <div className="bg-docker text-white rounded-full px-4 py-2">
                            <p>{tag.architecture}</p>
                        </div>
                        <div className="bg-docker text-white rounded-full px-4 py-2">
                            <p>{tag.fsLayers.length} layer(s)</p>
                        </div>
                    </div>

                    <ul className="flex flex-col">
                        {tag.fsLayers.map((layer, index) => (
                            <li
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
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </Page>
    )
}
