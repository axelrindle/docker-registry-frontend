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

export default function Select({
    options, includeAll, label, onSelectionChanged, preselect
}: Props) {
    const [selection, setSelection] = useState<string|undefined>(preselect)

    function onSelect(event: SyntheticEvent) {
        const target = event.target as HTMLSelectElement
        let index = target.selectedIndex

        if (includeAll && index === 0) {
            setSelection(undefined)
        }
        else {
            if (includeAll) {
                index--
            }
            setSelection(options[index].value)
        }
    }

    useEffect(() => {
        if (! onSelectionChanged) return

        const option = options.find(el => el.value === selection)
        onSelectionChanged(option)
    }, [selection, onSelectionChanged, options])

    return (
        <div className="flex items-center">
            {label && <span>{label}</span>}
            <select
                className={`p-2 rounded ${label ? 'ml-4' : ''}`}
                onChange={onSelect}
                value={selection}
            >
                {includeAll && <option value="">All</option>}
                {options.map(option => (
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
