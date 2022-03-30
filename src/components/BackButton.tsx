import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom'

export default function BackButton() {
    const history = useHistory()

    return (
        <div
            className="
                flex gap-2 items-center justify-center
                py-2 px-4 mb-2
                bg-docker text-white
                shadow rounded
                cursor-pointer
                transition-colors hover:bg-blue-500
            "
            onClick={() => history.goBack()}
        >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Go back</span>
        </div>
    )
}
