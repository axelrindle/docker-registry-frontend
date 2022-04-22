import { MouseEventHandler } from 'react'
import NavBaseItem, { Props as NavBaseProps } from './NavBaseItem'
import NavIcon, { Props as NavIconProps } from './NavIcon'
import { BASE_CLASS_NAMES, CLASS_NAME_HOVER } from './NavLinkItem'

export interface Props extends Omit<NavBaseProps, 'children'>, NavIconProps {
    id?: string
    onClick?: MouseEventHandler
}

export default function NavButtonItem(props: Props) {
    return (
        <NavBaseItem tooltip={props.tooltip}>
            <div
                id={props.id}
                className={`${BASE_CLASS_NAMES} ${CLASS_NAME_HOVER} ${props.className || ''} cursor-pointer`}
                onClick={props.onClick}
            >
                <NavIcon icon={props.icon} iconSpin={props.iconSpin} />
            </div>
        </NavBaseItem>
    )
}
