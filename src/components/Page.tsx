export interface Props {
    children?: any
    flex?: boolean
}

export default function Page(props: Props) {

    return (
        <div className="container mx-auto">
            { props.flex
                ? <div className="flex flex-col justify-center items-center">
                    {props.children}
                </div>
                : props.children
            }
        </div>
    )
}
