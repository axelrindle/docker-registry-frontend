import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface Props {
    icon: IconProp
    iconSpin?: boolean
}

export default function NavIcon(props: Props) {
    return <FontAwesomeIcon icon={props.icon} spin={props.iconSpin} />
}
