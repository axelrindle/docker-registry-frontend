import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import Card from '../../components/Card'
import InputText from '../../components/form/InputText'
import Select from '../../components/form/Select'
import Page from '../../components/Page'
import { RootState } from '../../store'
import { Tag } from '../../store/slice/docker'
import Page404 from '../404'

export interface PageRepositoryParams {
    repositoryId: string
}

export default function PageRepository() {
    const { repositoryId }: PageRepositoryParams = useParams()
    const repositories = useSelector((state: RootState) => state.docker.repositories)
    const repository = repositories.find(el => el.id === repositoryId)

    const [filterArchitecture, setFilterArchitecture] = useState<string|undefined>()
    const [filterName, setFilterName] = useState<string|undefined>()
    const [visibleTags, setVisibleTags] = useState<Tag[]>([])

    useEffect(() => {
        if (! repository) return

        const tags = repository.tags
            .filter(tag => filterArchitecture ? tag.architecture === filterArchitecture : true)
            .filter(tag => filterName ? tag.name.toLowerCase().includes(filterName.toLowerCase()) : true)
        setVisibleTags(tags)
    }, [filterArchitecture, filterName, repository])

    if (! repository) {
        return <Page404 />
    }

    return (
        <Page flex>
            <div
                style={{
                    width: '500px'
                }}
            >
                <BackButton />
                <Card>
                    <div className="flex justify-between items-end">
                        <p className="text-4xl">{repository.name}</p>
                        <p><u>{repository.tags.length} tag(s)</u></p>
                    </div>

                    <hr className="border-t-2 my-6" />

                    <div
                        className="flex justify-between gap-6 mb-6"
                    >
                        <Select
                            options={Array.from(new Set(repository.tags.map(el => el.architecture))).map(el => ({
                                display: el,
                                value: el
                            }))}
                            label="Architecture:"
                            onSelectionChanged={option => setFilterArchitecture(option?.value)}
                            includeAll
                        />
                        <InputText
                            label="Search:"
                            onValueChanged={setFilterName}
                        />
                    </div>

                    <div className="flex flex-col">
                        {visibleTags.length > 0 && visibleTags.map(tag => (
                            <Link
                                to={`/r/${repository.id}/tag/${tag.name}`}
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
                        {visibleTags.length === 0 && (
                            <p className="text-center">No matches...</p>
                        )}
                    </div>
                </Card>
            </div>
        </Page>
    )
}
