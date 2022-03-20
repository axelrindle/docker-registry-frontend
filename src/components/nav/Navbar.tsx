import { ReactElement } from 'react';
import MobyLogo from '../../Moby-logo.png';

export interface Props {
    className?: string
    itemsNav?: ReactElement
    itemsActions?: ReactElement
}

export default function Navbar(props: Props) {
    const itemsNav = props.itemsNav || [];
    const itemsActions = props.itemsActions || [];

    return (
        <div className={`
            h-16 w-full shadow bg-white text-gray-700
            dark:bg-gray-900 dark:text-white
            ${props.className || ''}
        `}>
            <div className="container mx-auto flex flex-row items-center h-full">

                {/* Logo */}
                <div className="h-full w-16 flex items-center">
                    <img
                        className="h-12 w-12 mx-auto"
                        src={MobyLogo}
                        alt="moby logo" />
                </div>

                {/* Nav items */}
                {itemsNav && itemsNav}

                {/* Action items */}
                {itemsActions && itemsActions}
            </div>
        </div>
    )
}
