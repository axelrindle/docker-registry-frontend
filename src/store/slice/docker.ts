import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { serializeError } from 'serialize-error';
import { RootState } from '..';
import * as service from '../../service/registry'
import { setError, setLoading } from './common';

export interface Tag {
    name: string
    architecture: string
    fsLayers: string[]
}

export interface Repository {
    name: string
    tags: Tag[]
}

export interface State {
    repositories: Repository[]
}

const initialState: State = {
    repositories: []
}

export const loadRepositories = createAsyncThunk(
    'load/repositories',
    async (_, { dispatch, getState }) => {
        const state = getState() as RootState
        if (state.common.loading) return

        dispatch(setLoading(true))
        try {
            dispatch(clearRepositories())

            const repositories = await service.listRepositories()
            for (const repository of repositories) {
                const tagList = await service.listTags(repository)
                const tags: Tag[] = []
                for (const tag of tagList) {
                    const tagData = await service.readTag(repository, tag)
                    tags.push(tagData)
                }

                dispatch(addRepository({
                    name: repository,
                    tags
                }))
            }
        } catch (error) {
            dispatch(setError(serializeError(error)))
            console.error(error)
        }
        dispatch(setLoading(false))
    }
)

const slice = createSlice({
    name: 'docker',
    initialState,
    reducers: {
        addRepository(state, action: PayloadAction<Repository>) {
            state.repositories.push(action.payload)
        },
        updateRepository(state, action: PayloadAction<Repository>) {
            const updated = action.payload
            const currentIndex = state.repositories.findIndex(el => el.name === updated.name)

            if (currentIndex === -1) {
                throw new Error(`No repository found with name "${updated.name}"!`)
            }

            state.repositories[currentIndex] = updated
        },
        clearRepositories(state) {
            state.repositories = []
        }
    }
})

export const {
    addRepository, updateRepository,
    clearRepositories
} = slice.actions

export default slice.reducer
