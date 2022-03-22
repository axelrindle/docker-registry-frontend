import NavBaseItem, { Props as NavBaseProps } from './NavBaseItem'
import NavIcon, { Props as NavIconProps } from './NavIcon'
import { BASE_CLASS_NAMES } from './NavLinkItem'
import { twMerge } from 'tailwind-merge'

export interface Props extends Omit<NavBaseProps, 'children'>, NavIconProps {
    className?: string
}

export default function NavStaticItem(props: Props) {
    const className = twMerge(BASE_CLASS_NAMES, props.className)

    const element = (
        <div className={className}>
            <NavIcon {...props} />
        </div>
    )

    if (! props.tooltip) {
        return element
    }

    return (
        <NavBaseItem tooltip={props.tooltip}>
            {element}
        </NavBaseItem>
    )
}
