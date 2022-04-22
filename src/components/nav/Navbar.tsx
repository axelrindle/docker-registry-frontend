import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactElement, useState } from 'react';
import MobyLogo from '../../Moby-logo.png';
import { BASE_CLASS_NAMES, CLASS_NAME_HOVER } from './item/NavLinkItem'

export interface Props {
    className?: string
    itemsNav?: ReactElement
    itemsActions?: ReactElement
}

export default function Navbar(props: Props) {
    const itemsNav = props.itemsNav || [];
    const itemsActions = props.itemsActions || [];

    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className={`
            h-16 w-full shadow bg-white text-gray-700
            dark:bg-gray-900 dark:text-white
            z-50 fixed top-0
            px-6
        `}>
            {menuOpen && <div className="fixed left-0 right-0 top-16 bottom-0" style={{
                backgroundColor: 'rgba(0, 0, 0, .5)'
            }} />}
            <div className="container mx-auto flex flex-row items-center">

                {/* Logo */}
                <div className="h-16 w-16 flex items-center">
                    <img
                        className="h-12 w-12 mx-auto"
                        src={MobyLogo}
                        alt="moby logo" />
                </div>

                {/* Items */}
                <div className={`
                    fixed lg:static
                    lg:flex lg:shadow-none lg:bg-transparent
                    flex-auto left-0 right-0
                    bg-white dark:bg-gray-900 border-gray-700
                    ${menuOpen ? 'top-16' : '-top-full'}
                    transform duration-300
                    shadow px-6
                `}>
                    <div className={`
                        flex md:ml-6
                    `}>
                        {itemsNav}
                    </div>

                    <div className="flex flex-col md:flex-row ml-auto">
                        {itemsActions}
                    </div>
                </div>

                {/* Menu toggle for small screens */}
                <div
                    className={`
                        ${BASE_CLASS_NAMES} ${CLASS_NAME_HOVER}
                        ml-auto cursor-pointer
                        lg:hidden
                        ${menuOpen && 'bg-gray-200 dark:bg-gray-800'}
                    `}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <FontAwesomeIcon
                        className={`transform duration-150 ease-out ${menuOpen ? 'rotate-90 ' : ''}`}
                        icon={menuOpen ? faTimes : faBars}
                    />
                </div>
            </div>
        </div>
    )
}
