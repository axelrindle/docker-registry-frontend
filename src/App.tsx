import { faChevronRight, faHdd, faLayerGroup, faMoon, faQuestionCircle, faStream, faSun, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    BrowserRouter as Router, Route, Switch
} from "react-router-dom"
import NavActions from './components/nav/container/NavActions'
import NavItems from './components/nav/container/NavItems'
import NavButtonItem from './components/nav/item/NavButtonItem'
import NavLinkItem from './components/nav/item/NavLinkItem'
import NavStaticLinkItem from './components/nav/item/NavStaticLinkItem'
import Navbar from './components/nav/Navbar'
import Home from './pages/home'
import Repository from './pages/repository'
import { RootState } from './store'
import { toggleDarkMode } from './store/slice/common'
import { loadRepositories } from './store/slice/docker'
import loadingImage from './assets/undraw_synchronize_ccxk.svg'
import Page404 from './pages/404'
import Tag from './pages/repository/Tag'
import NavStaticItem from './components/nav/item/NavStaticItem'

function App() {
    const html = document.querySelector('html')
    const darkModeActive = useSelector((state: RootState) => state.common.darkMode)
    if (darkModeActive) {
        html?.classList.add('dark')
    }
    useEffect(() => {
        localStorage.setItem('dark', `${darkModeActive}`)
        darkModeActive
            ? html?.classList.add('dark')
            : html?.classList.remove('dark')
    }, [darkModeActive, html?.classList])

    const dispatch = useDispatch()
    const loading = useSelector((state: RootState) => state.common.loading)

    useEffect(() => {
        dispatch(loadRepositories())
    }, [dispatch])

    return (
        <Router>
            <div className="w-full h-full flex flex-col">
                <Navbar className="z-50"
                    itemsNav={
                        <NavItems>
                            <NavLinkItem
                                icon={faStream}
                                link="/"
                                tooltip="Repository Overview"
                            />
                            <NavStaticItem
                                icon={faChevronRight}
                                className="text-gray-400"
                            />
                            <NavStaticLinkItem
                                linkExact={false}
                                link="/r"
                                icon={faHdd}
                                tooltip="Repository"
                            />
                            <NavStaticLinkItem
                                linkExact={false}
                                link="/r/*/"
                                icon={faLayerGroup}
                                tooltip="Layers"
                            />
                        </NavItems>
                    }
                    itemsActions={
                        <NavActions>
                            <NavButtonItem
                                className="text-docker"
                                icon={faSyncAlt}
                                iconSpin={loading}
                                onClick={(_) => dispatch(loadRepositories())}
                                tooltip="Refresh the repository list"
                            />
                            <NavButtonItem
                                className={darkModeActive ? 'dark:text-indigo-500' : 'text-yellow-500'}
                                icon={darkModeActive ? faMoon : faSun}
                                onClick={(_) => dispatch(toggleDarkMode())}
                                tooltip="Toggle the dark mode"
                            />
                            <NavLinkItem
                                icon={faQuestionCircle}
                                link="/help"
                                tooltip="Help"
                            />
                        </NavActions>
                    }
                />

                <div className="my-6 flex-grow">
                    { loading && (
                        <div className="h-full flex flex-col justify-center items-center">
                            <object type="image/svg+xml" data={loadingImage}>
                                Loading...
                            </object>
                        </div>
                    )}
                    {! loading && (
                        <Switch>
                            <Route path="/help">
                                <p>
                                    Help
                                </p>
                            </Route>
                            <Route path="/r/:repositoryName+/tag/:tagName">
                                <Tag />
                            </Route>
                            <Route path="/r/:repositoryName+">
                                <Repository />
                            </Route>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route>
                                <Page404 />
                            </Route>
                        </Switch>
                    )}
                </div>

                <div
                    className="
                        flex flex-col items-center justify-center
                        p-12 gap-2
                        bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-white
                    "
                >
                    <p>
                        Docker Registry Frontend v{process.env.VERSION}
                    </p>
                    <a
                        href="https://github.com/axelrindle/docker-registry-frontend"
                        target="_blank"
                        rel="noreferrer"
                        className="text-docker underline"
                    >
                        Source Code on GitHub
                    </a>
                </div>
            </div>
        </Router>
    )
}

export default App
