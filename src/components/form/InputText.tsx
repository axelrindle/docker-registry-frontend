import { useEffect, useState } from 'react'

export interface Props {
    label?: string
    initialValue?: string
    onValueChanged?: (value: string | undefined) => void
}

export default function InputText({
    label, initialValue, onValueChanged
}: Props) {
    const [value, setValue] = useState<string|undefined>(initialValue)

    useEffect(() => {
        if (! onValueChanged) return

        onValueChanged(value)
    }, [value, onValueChanged])

    return (
        <div className="flex items-center">
            {label && <span>{label}</span>}
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
