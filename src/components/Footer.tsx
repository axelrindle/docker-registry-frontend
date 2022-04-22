import Version from './Version'

export default function Footer() {
    return (
        <div
            className="
                flex flex-col items-center justify-center
                p-12 gap-2
                bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-white
            "
        >
            <p className="text-center">
                Docker Registry Frontend <Version />
            </p>
            <a
                href="https://github.com/axelrindle/docker-registry-frontend"
                target="_blank"
                rel="noreferrer"
                className="text-docker underline"
            >
                Source Code on GitHub
            </a>
        </div>
    )
}
