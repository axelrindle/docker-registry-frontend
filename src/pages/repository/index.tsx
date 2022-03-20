import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Card from '../../components/Card'
import Select from '../../components/form/Select'
import Page from '../../components/Page'
import { RootState } from '../../store'
import { Repository } from '../../store/slice/docker'
import Page404 from '../404'

interface Params {
    repositoryName: string
}

export default function PageRepository() {
    const { repositoryName }: Params = useParams()
    const repositories = useSelector((state: RootState) => state.docker.repositories)
    const repository = repositories.find(el => el.name === repositoryName)

    const [filterArchitecture, setFilterArchitecture] = useState<string|undefined>()

    function getTags(repository: Repository) {
        if (! filterArchitecture) return repository.tags
        return repository.tags.filter(tag => tag.architecture === filterArchitecture)
    }

    if (! repository) {
        return <Page404 />
    }

    return (
        <Page flex>
            <div
                style={{
                    width: "500px"
                }}
            >
                <Card>
                    <div className="flex justify-between items-end mb-6">
                        <p className="text-4xl">{repository.name}</p>
                        <p><u>{repository.tags.length} tag(s)</u></p>
                    </div>

                    <hr />

                    <Select
                        options={Array.from(new Set(repository.tags.map(el => el.architecture))).map(el => ({
                            display: el,
                            value: el
                        }))}
                        label="Architecture:"
                        onSelectionChanged={option => setFilterArchitecture(option?.value)}
                        includeAll
                    />

                    <div className="flex flex-col">
                        {getTags(repository).map(tag => (
                            <Link
                                to={`/r/${repository.name}/tag/${tag.name}`}
                                key={tag.name}
                                className="
                                    bg-docker text-white
                                    p-3 mb-3
                                    shadow rounded
                                    transition-all hover:bg-blue-500 cursor-pointer
                                    flex justify-between items-center
                                "
                            >
                                <b>{tag.name}</b>
                                <pre
                                    className="
                                        border-2 border-white
                                        px-2 py-1
                                        rounded-full
                                    "
                                >
                                    {tag.architecture}
                                </pre>
                            </Link>
                        ))}
                    </div>
                </Card>
            </div>
        </Page>
    )
}
