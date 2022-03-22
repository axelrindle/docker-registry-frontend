import { useEffect, useState } from 'react'

export interface Props {
    label?: string
    initialValue?: string
    onValueChanged?: (value: string | undefined) => void
}

export default function InputText(props: Props) {
    const [value, setValue] = useState<string|undefined>(props.initialValue)

    useEffect(() => {
        if (! props.onValueChanged) return

        props.onValueChanged(value)
    }, [value])

    return (
        <div className="flex items-center">
            {props.label && <span>{props.label}</span>}
            <input
                type="text"
                placeholder="GF"
                className="
                    w-full h-full
                    ml-4 px-2
                    border-2 rounded
                    outline-none transition-colors
                    focus:border-docker
                "
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </div>
    )
}
