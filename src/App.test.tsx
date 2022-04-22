import { queryByAttribute, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

const getById = queryByAttribute.bind(null, 'id');

let container: HTMLElement
beforeEach(() => {
    const result = render(
        <Provider store={store}>
            <App />
        </Provider>
    )
    container = result.container
})

test('dark mode button toggles a css class', async () => {
    const html = document.querySelector('html')
    const toggleDarkMode: HTMLElement|null = getById(container, 'toggleDarkMode')
    expect(html).toBeTruthy()
    expect(toggleDarkMode).toBeTruthy()
    expect(toggleDarkMode).toBeInTheDocument()

    expect(store.getState().common.darkMode).toBeFalsy()
    toggleDarkMode?.click()
    expect(store.getState().common.darkMode).toBeTruthy()
    expect(html?.classList).toContain('dark')
})
