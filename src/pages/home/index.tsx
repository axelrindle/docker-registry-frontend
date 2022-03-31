import { faTh, faThList, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import Page from '../../components/Page'
import { RootState } from '../../store'

interface ViewMode {
    name: string
    icon: IconDefinition
    gridClass: string
    cardClass: string
}

const ViewModes: ViewMode[] = [
    {
        name: 'Grid',
        icon: faTh,
        gridClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        cardClass: 'col-span-1 md:col-span-2 lg:col-span-3'
    },
    {
        name: 'List',
        icon: faThList,
        gridClass: 'grid-cols-1',
        cardClass: 'col-span-1'
    }
]

const ViewModeKey = 'repository_list_view_mode'

export default function PageHome() {
    const repos = useSelector((state: RootState) => state.docker.repositories)

    const viewModeFromStorage = (() => {
        const storageEntry = localStorage.getItem(ViewModeKey)
        if (! storageEntry) return ViewModes[0]
        else return ViewModes[parseInt(storageEntry)]
    })()
    const [viewMode, setViewMode] = useState<ViewMode>(viewModeFromStorage)

    useEffect(() => {
        localStorage.setItem(ViewModeKey, ViewModes.findIndex(el => el.name === viewMode.name).toString())
    }, [viewMode])

    return (
        <Page flex>
            <Card className="flex justify-between gap-16 items-center mb-6">
                <p className="text-4xl">Repository List</p>
                <Tippy content="Click to toggle view mode">
                    <button
                        className="bg-docker text-white rounded gap-4 px-4 py-2 items-center hidden md:flex"
                        onClick={() => {
                            const currentIndex = ViewModes.findIndex(el => el.name === viewMode.name)
                            let nextViewMode: ViewMode
                            if (currentIndex === (ViewModes.length -1)) {
                                nextViewMode = ViewModes[0]
                            }
                            else {
                                nextViewMode = ViewModes[currentIndex + 1]
                            }
                            setViewMode(nextViewMode)
                        }}
                    >
                        <FontAwesomeIcon icon={viewMode.icon} />
                        <p>{viewMode.name}</p>
                    </button>
                </Tippy>
            </Card>

            <div className={`grid ${viewMode.gridClass} gap-6`}>
                {repos.map(repo => (
                    <Link
                        key={repo.name}
                        to={`/r/${repo.id}`}
                        className="
                            flex flex-col justify-between gap-2
                            shadow rounded p-6
                            bg-white text-gray-900
                            dark:bg-gray-700 dark:text-white
                            transition-all hover:shadow-xl
                        "
                    >
                        <div>
                            <p><b>{repo.name}</b></p>
                        </div>
                        <div>
                            <p>{repo.tags.length} tag(s)</p>
                        </div>
                    </Link>
                ))}
            </div>
        </Page>
    )
}
