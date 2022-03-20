import { configureStore } from '@reduxjs/toolkit'
import common from './slice/common'
import docker from './slice/docker'

const store = configureStore({
    reducer: {
        common, docker
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
