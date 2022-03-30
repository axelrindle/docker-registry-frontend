import { MouseEventHandler, ReactNode } from "react"
import { twMerge } from 'tailwind-merge'

export interface Props {
    children?: ReactNode | undefined
    className?: string
    dimmed?: boolean
    onClick?: MouseEventHandler
}

export default function Card(props: Props) {
    const baseClassNames = `
        shadow rounded
        p-6 last:mb-0
        text-gray-900
        ${props.dimmed
            ? 'bg-gray-100'
            : 'bg-white'}
        ${props.dimmed
            ? 'dark:bg-gray-700 dark:text-white'
            : 'dark:bg-gray-600 dark:text-white'}
    `
    const className = twMerge(baseClassNames, props.className)

    return (
        <div className={className} onClick={props.onClick}>
            {props.children}
        </div>
    )
}
