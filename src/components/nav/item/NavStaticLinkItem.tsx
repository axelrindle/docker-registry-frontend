import NavLinkItem, { Props as NavLinkItemProps } from './NavLinkItem';

export interface Props extends Omit<NavLinkItemProps, "isActive"|"link"|"linkExact"> {
    regex: RegExp
}

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
            link=""
            isActive={(_match, location) => {
                const matches: RegExpMatchArray|null = location.pathname.match(props.regex)
                if (! matches) return false
                return matches.length > 0
            }}
        />
    )
}
