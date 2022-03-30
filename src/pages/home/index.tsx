import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Page from '../../components/Page'
import { RootState } from '../../store'

export default function PageHome() {
    const repos = useSelector((state: RootState) => state.docker.repositories)

    return (
        <Page flex>
            {repos.map(repo => (
                <Link
                    key={repo.name}
                    to={`/r/${repo.id}`}
                    className="
                        flex justify-between
                        shadow rounded
                        p-6 mb-6 last:mb-0
                        bg-white text-gray-900
                        dark:bg-gray-700 dark:text-white
                        transition-all hover:shadow-2xl
                    "
                    style={{
                        width: "350px"
                    }}
                >
                    <div>
                        <p><b>{repo.name}</b></p>
                    </div>
                    <div>
                        <p>{repo.tags.length} tag(s)</p>
                    </div>
                </Link>
            ))}
        </Page>
    )
}
