import Tippy from '@tippyjs/react';
import { ReactElement } from 'react';
import 'tippy.js/dist/tippy.css';

export interface Props {
    children?: ReactElement
    className?: string
    tooltip: string
}

export default function NavBaseItem(props: Props) {
    return (
        <Tippy
            content={props.tooltip}
            placement="bottom"
            delay={[600, 0]}
            children={props.children}
        />
    )
}
