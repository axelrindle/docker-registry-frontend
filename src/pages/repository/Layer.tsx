import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import Card from '../../components/Card'
import Page from '../../components/Page'
import { RootState } from '../../store'
import Page404 from '../404'
import { PageTagParams } from './Tag'

export interface PageLayerParams extends PageTagParams {
    digest: string
}

export default function PageLayer() {
    const { repositoryId, tagName, digest }: PageLayerParams = useParams()
    const repositories = useSelector((state: RootState) => state.docker.repositories)
    const repository = repositories.find(el => el.id === repositoryId)
    const tag = repository?.tags.find(el => el.name === tagName)
    const layer = tag?.fsLayers.find(el => el === digest)

    if (! repository || ! tag || !layer) {
        return <Page404 />
    }

    return (
        <Page flex>
            <div>
                <BackButton />
                <Card>
                    <p>{digest}</p>
                    <p className="mt-4 font-bold">
                        TODO: Show more information
                    </p>
                </Card>
            </div>
        </Page>
    )
}
