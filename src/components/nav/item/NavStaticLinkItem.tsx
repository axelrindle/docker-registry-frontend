import NavLinkItem, { Props } from './NavLinkItem';

export default function NavStaticLinkItem(props: Props) {
    return (
        <NavLinkItem
            {...props}
            className={`${props.className || ''} cursor-default`}
            hoverable={false}
            onClick={event => {
                event.preventDefault()
                props.onClick?.(event)
            }}
        />
    )
}
