import { faChevronRight, faHdd, faInfoCircle, faLayerGroup, faMapMarkerAlt, faMoon, faQuestionCircle, faSearch, faStream, faSun, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
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
import { ToastContainer } from 'react-toastify'
import registryUrl from './utils/registryUrl'
import { ScrollToTop } from 'react-simple-scroll-up'
import 'react-toastify/dist/ReactToastify.css'
import PageAbout from './pages/About'
import PageLayer from './pages/repository/Layer'

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
        <Router basename={process.env.PUBLIC_URL}>
            <div className="w-full h-full flex flex-col pt-16">
                <Navbar className="z-50 fixed top-0"
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
                                icon={faHdd}
                                regex={/^\/r\/[0-9A-Za-z]{1,}$/g}
                                tooltip="Repository"
                            />
                            <NavStaticLinkItem
                                icon={faLayerGroup}
                                regex={/^\/r\/[0-9A-Za-z]{1,}\/tag\/[0-9A-Za-z_.-]{1,}$/g}
                                tooltip="Layers"
                            />
                            <NavStaticLinkItem
                                icon={faSearch}
                                regex={/^\/r\/[0-9A-Za-z]{1,}\/tag\/[0-9A-Za-z_.-]{1,}\/layer\/.*$/g}
                                tooltip="Layer Details"
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
                            <NavLinkItem
                                icon={faInfoCircle}
                                link="/about"
                                tooltip="About"
                            />
                            <NavStaticItem
                                className="text-red-500"
                                icon={faMapMarkerAlt}
                                label="Registry Endpoint"
                                tooltip={registryUrl()}
                                tooltipDelay={[0, 600]}
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
                            <Route path="/about">
                                <PageAbout />
                            </Route>
                            <Route path="/r/:repositoryId/tag/:tagName/layer/:digest">
                                <PageLayer />
                            </Route>
                            <Route path="/r/:repositoryId/tag/:tagName">
                                <Tag />
                            </Route>
                            <Route path="/r/:repositoryId">
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

                <ToastContainer
                    position="bottom-right"
                    newestOnTop
                    pauseOnHover
                    pauseOnFocusLoss
                    theme={darkModeActive ? "light" : "dark"}
                />

                <ScrollToTop symbol="⬆" />
            </div>
        </Router>
    )
}

export default App
