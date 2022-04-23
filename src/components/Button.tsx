import { LegacyRef, MouseEventHandler, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface Props {
    children?: ReactNode
    className?: string
    onClick?: MouseEventHandler
    ref?: LegacyRef<never>
}

const defaultClassName = `
flex gap-2 items-center justify-center
py-2 px-4 mb-2
shadow rounded
cursor-pointer
bg-docker text-white
transition-colors hover:bg-blue-500
`

export default function Button(props: Props) {
    const className = twMerge(defaultClassName, props.className)

    return (
        <div
            className={className}
            onClick={props.onClick}
            ref={props.ref}
        >
            {props.children}
        </div>
    )
}
