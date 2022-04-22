import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import image404 from '../assets/undraw_page_not_found_re_e9o6.svg'

export default function Page404() {
    return (
        <Page>
            <div className="grid grid-cols-2 gap-x-16">
                <object
                    type="image/svg+xml"
                    data={image404}
                    style={{
                        width: 'fit-content'
                    }}
                >
                    Loading...
                </object>

                <div>
                    <p
                        className="
                            text-5xl font-bold
                            my-12
                        "
                    >
                        Not found!
                    </p>
                    <p>
                        The page you requested could not be found...
                    </p>

                    <Link
                        to="/"
                        className="
                            block text-center
                            mt-6 p-3 rounded shadow
                            bg-docker text-white
                            hover:underline
                        "
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span className="ml-2">Go back home</span>
                    </Link>
                </div>
            </div>
        </Page>
    )
}
