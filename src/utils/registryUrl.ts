import env from './env'

export default function registryUrl(): string {
    const original = env('REACT_APP_REGISTRY_API_URL')
    if (! original) {
        throw new Error('REACT_APP_REGISTRY_API_URL is not set!')
    }
    return original
        .replace('http://', '')
        .replace('https://', '')
}
