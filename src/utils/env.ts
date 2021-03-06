/**
 * Retrieves an environment variable. Depending on whether running in development or
 * production mode the variables are either retrieved from `process.env` (development)
 * or `window.__RUNTIME_CONFIG__` (production).
 *
 * @param key The name of the environment variable to retrieve.
 * @returns The value of the given environment variable or `undefined` if it could
 *          not be found.
 */
export default function env(key: string): string | undefined {
    let value: string | undefined

    if (typeof window.__RUNTIME_CONFIG__ !== 'undefined') {
        value = window.__RUNTIME_CONFIG__[key]
    }
    else if (typeof process !== 'undefined') {
        value = process.env[key]
    }
    else {
        throw new Error('Unable to retrieve environment information!')
    }

    return value
}
