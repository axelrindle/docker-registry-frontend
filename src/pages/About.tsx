import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faBook, faCodeBranch, faHandsHelping, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import confetti from 'canvas-confetti'
import { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'
import pkg from '../../package.json'
import Card from '../components/Card'
import Page from '../components/Page'

interface GridItemProps {
    className?: string
    icon: IconProp
    label: string
    link?: string
    linkExternal?: boolean
    onClick?: MouseEventHandler
}

function GridItem(props: GridItemProps) {
    const baseClassName = `
        flex flex-col gap-4
        items-center justify-center
        p-10
        transition-colors hover:bg-blue-50
    `
    const className = twMerge(baseClassName, props.className)

    const card = (
        <Card
            className={className}
            onClick={props.onClick}
        >
            <FontAwesomeIcon
                icon={props.icon}
                size="2x"
                className="text-docker"
            />
            <span className="font-bold text-center">
                {props.label}
            </span>
        </Card>
    )

    if (props.linkExternal) {
        return (
            <a
                href={props.link}
                rel="noreferrer"
            >
                {card}
            </a>
        )
    }

    if (props.link) {
        return (
            <Link to={props.link}>
                {card}
            </Link>
        )
    }

    return card
}

function launchFirework(duration: number) {
    const animationEnd = Date.now() + duration
    const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0
    }

    function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timer = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
            return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
            particleCount, origin: {
                x: randomInRange(0.1, 0.3),
                y: Math.random() - 0.2
            }
        }));
        confetti(Object.assign({}, defaults, {
            particleCount, origin: {
                x: randomInRange(0.7, 0.9),
                y: Math.random() - 0.2
            }
        }));
    }, 250);
}

export default function PageAbout() {
    return (
        <Page flex>
            <div className="flex gap-2 items-end mb-2">
                <span className="text-4xl font-bold">{pkg.name}</span>
                <span className="text-xl">v{process.env.VERSION}</span>
            </div>
            <p>{pkg.description}</p>

            <hr className="w-full my-12 border-gray-500" />

            <div className="grid grid-cols-2 gap-4">
                <GridItem
                    icon={faCodeBranch}
                    label="Source Code"
                    link="https://github.com/axelrindle/docker-registry-frontend"
                    linkExternal
                />
                <GridItem
                    icon={faBook}
                    label="Documentation"
                    link="https://github.com/axelrindle/docker-registry-frontend/wiki"
                    linkExternal
                />
                <GridItem
                    icon={faHandsHelping}
                    label="Get Help"
                    link="/help"
                />
                <GridItem
                    className="cursor-pointer"
                    icon={faQuestion}
                    label="Reserved"
                    onClick={() => {
                        toast('Whoop Whoop', {
                            autoClose: 5000,
                            pauseOnFocusLoss: false,
                        })
                        launchFirework(5000)
                    }}
                />
            </div>
        </Page>
    )
}
