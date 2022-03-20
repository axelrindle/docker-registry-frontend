import { SyntheticEvent, useEffect, useState } from 'react'

export interface Option {
    value: string
    display: string
}

export interface Props {
    options: Option[]
    preselect?: string
    includeAll?: boolean
    label?: string
    onSelectionChanged?: (option: Option | undefined) => void
}

export default function Select(props: Props) {
    const [selection, setSelection] = useState<string|undefined>(props.preselect)

    function onSelect(event: SyntheticEvent) {
        const target = event.target as HTMLSelectElement
        let index = target.selectedIndex

        if (props.includeAll && index === 0) {
            setSelection(undefined)
        }
        else {
            if (props.includeAll) {
                index--
            }
            setSelection(props.options[index].value)
        }
    }

    useEffect(() => {
        if (! props.onSelectionChanged) return

        const option = props.options.find(el => el.value === selection)
        props.onSelectionChanged(option)
    }, [selection])

    return (
        <div className="flex items-center mb-6">
            {props.label && <span>{props.label}</span>}
            <select
                className={`p-2 ${props.label ? 'ml-4' : ''}`}
                onChange={onSelect}
                value={selection}
            >
                {props.includeAll && <option value="">All</option>}
                {props.options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.display}
                    </option>
                ))}
            </select>
        </div>
    )
}
