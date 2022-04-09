import { Tag } from '../store/slice/docker'
import env from '../utils/env'

interface ManifestsResponse {
    schemaVersion: number
    name: string
    tag: string
    architecture: string
    fsLayers: { blobSum: string }[]
    history: { v1Compatibility: string }[]
}

function getUrl(path = '') {
    return new URL(`v2/${path}`, env('REACT_APP_REGISTRY_API_URL')).toString()
}

export async function listRepositories(): Promise<string[]> {
    const response = await fetch(getUrl('_catalog'))
    const data = await response.json()
    return data.repositories
}

export async function listTags(repository: string): Promise<string[]> {
    const response = await fetch(getUrl(`${repository}/tags/list`))
    const data = await response.json()
    return data.tags
}

export async function readTag(repository: string, tag: string): Promise<Tag> {
    const response = await fetch(getUrl(`${repository}/manifests/${tag}`))
    const data: ManifestsResponse = await response.json()

    return {
        name: data.tag,
        architecture: data.architecture,
        fsLayers: data.fsLayers.map(el => el.blobSum),
        history: data.history.map(el => {
            const v1 = JSON.parse(el.v1Compatibility)
            return {
                cmd: v1.container_config?.Cmd,
                created: v1.created,
                id: v1.id,
                docker_version: v1.docker_version,
                parent: v1.parent
            }
        })
    }
}
