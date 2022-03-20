import { ReactNode } from "react"

export interface Props {
    children?: ReactNode | undefined
    dimmed?: boolean
}

export default function Card(props: Props) {
    return (
        <div
            className={`
                shadow rounded
                p-6 mb-6 last:mb-0
                text-gray-900
                ${props.dimmed
                    ? 'bg-gray-100'
                    : 'bg-white'}
                ${props.dimmed
                    ? 'dark:bg-gray-700 dark:text-white'
                    : 'dark:bg-gray-600 dark:text-white'}
            `}
        >
            {props.children}
        </div>
    )
}
