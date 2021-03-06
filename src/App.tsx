import { faChevronRight, faHdd, faInfoCircle, faLayerGroup, faMapMarkerAlt, faMoon, faQuestionCircle, faSearch, faStream, faSun, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    BrowserRouter as Router, Route, Switch
} from 'react-router-dom'
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
import { ScrollToTop } from 'react-simple-scroll-up'
import 'react-toastify/dist/ReactToastify.css'
import env from './utils/env'
import PageAbout from './pages/About'
import PageLayer from './pages/repository/Layer'
import Footer from './components/Footer'

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
                <Navbar
                    itemsNav={<>
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
                    </>}
                    itemsActions={<>
                        <NavButtonItem
                            className="text-docker"
                            icon={faSyncAlt}
                            iconSpin={loading}
                            onClick={(_) => dispatch(loadRepositories())}
                            tooltip="Refresh the repository list"
                        />
                        <NavButtonItem
                            id="toggleDarkMode"
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
                            tooltip={env('REACT_APP_REGISTRY_API_URL')}
                            tooltipDelay={[0, 600]}
                        />
                    </>}
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

                <Footer />

                <ToastContainer
                    position="bottom-right"
                    newestOnTop
                    pauseOnHover
                    pauseOnFocusLoss
                    theme={darkModeActive ? 'light' : 'dark'}
                />

                <ScrollToTop symbol="???" />
            </div>
        </Router>
    )
}

export default App
