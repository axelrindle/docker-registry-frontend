export interface Props {
    label: string
}

export default function Tag({
    label
}: Props) {
    return (
        <div
            className="
                px-4 py-2
                rounded-full
                border-2 border-docker
                text-docker dark:text-white
            "
        >
            <p>{label}</p>
        </div>
    )
}
