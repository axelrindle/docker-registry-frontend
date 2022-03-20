export { };

declare global {
    interface Window {
        __RUNTIME_CONFIG__: {
            [key: string]: string
            NODE_ENV: string
            REGISTRY_API_URL: string
        }
    }
}
