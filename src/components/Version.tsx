export default function Version() {
    const version = process.env.VERSION

    if (! version) {
        return (
            <span>v-unknown</span>
        )
    }

    if (version === 'next') {
        return (
            <span>v-{version}</span>
        )
    }

    return (
        <a
            className="underline italic"
            href={`https://github.com/axelrindle/docker-registry-frontend/tree/${version}`}
        >
            v-{version.substring(0, 7)}
        </a>
    )
}
