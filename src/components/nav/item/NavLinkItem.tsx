import { LocationDescriptor } from 'history'
import { MouseEventHandler } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import NavBaseItem, { Props as NavBaseProps } from './NavBaseItem'
import NavIcon, { Props as NavIconProps } from './NavIcon'

export interface Props extends Omit<NavBaseProps, 'children'>, NavIconProps {
    className?: string
    hoverable?: boolean
    isActive?: NavLinkProps['isActive']
    link: LocationDescriptor
    linkExact?: boolean
    onClick?: MouseEventHandler
}

export const BASE_CLASS_NAMES = `
h-16 w-16 px-6
flex justify-center items-center
transition-colors duration-100
`

export const CLASS_NAME_HOVER = 'hover:bg-blue-200 dark:hover:bg-docker dark:hover:text-white'

export default function NavLinkItem(props: Props) {
    const className = `
        ${BASE_CLASS_NAMES}
        ${props.hoverable === undefined ? CLASS_NAME_HOVER : ''}
        ${props.className}
    `

    return (
        <NavBaseItem tooltip={props.tooltip}>
            <NavLink
                to={props.link}
                className={className}
                activeClassName="
                    bg-docker text-white
                    hover:bg-docker
                "
                exact={props.linkExact ?? true}
                onClick={props.onClick}
                isActive={props.isActive}
            >
                <NavIcon {...props} />
            </NavLink>
        </NavBaseItem>
    )
}
