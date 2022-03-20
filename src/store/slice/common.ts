import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorObject } from 'serialize-error';

export interface State {
    darkMode: boolean
    error: ErrorObject|null
    loading: boolean
}

const initialState: State = {
    darkMode: localStorage.getItem('dark') === 'true',
    error: null,
    loading: false
}

const slice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<State['error']>) {
            state.error = action.payload
        },
        setLoading(state, action: PayloadAction<State['loading']>) {
            state.loading = action.payload
        },
        toggleDarkMode(state) {
            state.darkMode = ! state.darkMode
            localStorage.setItem('dark', `${state.darkMode}`)
        }
    }
})

export const { setError, setLoading, toggleDarkMode } = slice.actions

export default slice.reducer
