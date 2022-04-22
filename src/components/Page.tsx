import { ReactNode } from 'react'

export interface Props {
    children?: ReactNode
    flex?: boolean
}

export default function Page(props: Props) {

    return (
        <div className="container mx-auto px-4 md:px-0">
            { props.flex
                ? <div className="flex flex-col justify-center items-center">
                    {props.children}
                </div>
                : props.children
            }
        </div>
    )
}
