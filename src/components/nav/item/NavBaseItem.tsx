import Tippy, { TippyProps } from '@tippyjs/react';
import { ReactElement } from 'react';
import 'tippy.js/dist/tippy.css';

export interface Props {
    children?: ReactElement
    className?: string
    tooltip?: string
    tooltipDelay?: TippyProps['delay']
}

export default function NavBaseItem(props: Props) {
    return (
        <Tippy
            content={props.tooltip}
            placement="bottom"
            delay={props.tooltipDelay === undefined ? [600, 0] : props.tooltipDelay}
        >
            {props.children}
        </Tippy>
    )
}
