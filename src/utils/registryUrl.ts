import env from './env'

export default function registryUrl(): string {
    const original = env('REACT_APP_REGISTRY_API_URL')
    return original!
        .replace('http://', '')
        .replace('https://', '')
}
