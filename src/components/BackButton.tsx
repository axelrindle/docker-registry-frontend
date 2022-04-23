import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom'
import Button from './Button'

export default function BackButton() {
    const history = useHistory()

    return (
        <Button
            onClick={() => history.goBack()}
        >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Go back</span>
        </Button>
    )
}
