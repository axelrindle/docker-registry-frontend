import { Tag } from '../store/slice/docker'
import env from '../utils/env'

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
    const data = await response.json()
    return {
        name: data.tag,
        architecture: data.architecture,
        fsLayers: data.fsLayers.map((el: { blobSum: string }) => el.blobSum)
    }
}
