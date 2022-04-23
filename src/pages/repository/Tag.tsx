import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { PageRepositoryParams } from '.'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Page from '../../components/Page'
import Tag from '../../components/Tag'
import { RootState } from '../../store'
import registryUrl from '../../utils/registryUrl'
import Page404 from '../404'

export interface PageTagParams extends PageRepositoryParams {
    tagName: string
}

export default function PageTag() {
    const { repositoryId, tagName }: PageTagParams = useParams()
    const repositories = useSelector((state: RootState) => state.docker.repositories)
    const repository = repositories.find(el => el.id === repositoryId)
    const tag = repository?.tags.find(el => el.name === tagName)

    if (! repository || ! tag) {
        return <Page404 />
    }

    const [copied, setCopied] = useState(false)
    const pullCommand = `docker pull ${registryUrl()}/${repository.name}:${tag.name}`

    return (
        <Page flex>
            <div
                style={{
                    maxWidth: '700px'
                }}
            >
                <BackButton />
                <Card>
                    <div>
                        <p className="text-4xl">{repository.name}</p>
                        <p className="text-2xl">{tag.name}</p>
                    </div>

                    <hr className="my-6" />

                    <div className="flex gap-4">
                        <div className="flex-1 bg-gray-500 text-white p-4">
                            <pre className="whitespace-pre-wrap">
                                {pullCommand}
                            </pre>
                        </div>
                        <Tippy
                            placement="top"
                            content={!copied ? 'Copy to clipboard' : 'Copied!'}
                            hideOnClick={false}
                            onHidden={() => setCopied(false)}
                        >
                            <span className="min-h-full">
                                <CopyToClipboard
                                    text={pullCommand}
                                    onCopy={() => setCopied(true)}
                                >
                                    <Button className="m-0 h-full">
                                        <FontAwesomeIcon icon={faCopy} />
                                    </Button>
                                </CopyToClipboard>
                            </span>
                        </Tippy>
                    </div>

                    <hr className="my-6" />

                    <div className="flex gap-2 mb-6">
                        <Tag label={tag.architecture} />
                        <Tag label={`${tag.fsLayers.length} layer(s)`} />
                    </div>

                    <div className="flex flex-col">
                        {tag.fsLayers.map((layer, index) => (
                            <Link
                            to={`/r/${repository.id}/tag/${tag.name}/layer/${layer}`}
                                key={index}
                                className="
                                    bg-docker text-white
                                    p-3 mb-3
                                    shadow rounded
                                    transition-all hover:bg-blue-500 cursor-pointer
                                    flex justify-between items-center
                                "
                            >
                                {layer}
                            </Link>
                        ))}
                    </div>
                </Card>
            </div>
        </Page>
    )
}
