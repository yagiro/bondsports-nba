import { createSelector } from '@reduxjs/toolkit'
import type { ApiSearchPlayersParams } from '../app-types'
import type { FiltersState, InputState } from './slices/inputSlice'

const getInput = (state: any): InputState => state.input;
const getFilters = createSelector<any[], FiltersState>(getInput, (input: InputState) => input.filters)

export const getFavoritePlayers = createSelector(
    [ getInput ],
    input => ({
        favoritePlayerIds: input.favoritePlayerIds,
        favoritePlayers: input.favoritePlayers,
    })
)

export const getPlayersSearchParams = createSelector(
    [ getFilters ],
    (filters): ApiSearchPlayersParams  => {
        const params: ApiSearchPlayersParams = {}
        if (filters.playerName) params.search = filters.playerName
        if (filters.page) params.page = filters.page
        if (filters.pageSize) params.per_page = filters.pageSize
        return params;
    }
)
