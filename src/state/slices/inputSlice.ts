import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { PlayerApiData, PlayerData } from '../../app-types'

export interface FiltersState {
    playerName?: string;
    page?: number;
    pageSize?: number;
}

export const filterKeys:
    Record<keyof FiltersState, keyof FiltersState> = {
    playerName: 'playerName',
    page: 'page',
    pageSize: 'pageSize',
}

interface SetFilterValueActionPayload {
    filterKey: keyof FiltersState;
    filterValue: any; 
}

interface SetFavoritePlayerActionPayload {
    player: PlayerApiData;
    value: boolean;
}
interface SetPlayerColorActionPayload {
    playerId: number;
    color: string;
}

export interface FavoritePlayers {
    [key: number]: PlayerData;
}

export interface InputState {
    filters: FiltersState;
    favoritePlayerIds: number[];
    favoritePlayers: FavoritePlayers;
}

const initialState: InputState = {
    filters: {
        page: 1,
    },
    favoritePlayerIds: [],
    favoritePlayers: {},
}

export const inputSlice = createSlice({
    initialState,
    name: 'input',
    reducers: {
        setFilterValue(state, action: PayloadAction<SetFilterValueActionPayload>) {
            const { filterKey, filterValue } = action.payload
            state.filters[filterKey] = filterValue
        },
        setFavoritePlayer(state, action: PayloadAction<SetFavoritePlayerActionPayload>) {
            const { player, value } = action.payload
            const favoriteIds = state.favoritePlayerIds
            const favorites = state.favoritePlayers
            if (value === true) {
                // add player
                if (!favorites[player.id]) { // verify uniqueness
                    favoriteIds.push(player.id)
                    favorites[player.id] = {
                        ...player,
                        color: '#ffe495',
                    }
                }
            }
            else {
                // remove player
                state.favoritePlayerIds = favoriteIds.filter(id => id !== player.id)
                delete state.favoritePlayers[player.id]
            }
        },
        setPlayerColor(state, action: PayloadAction<SetPlayerColorActionPayload>) {
            const { playerId, color } = action.payload
            const player = state.favoritePlayers[playerId]
            if (player) {
                player.color = color
            }
        }
    },
})

export const {
    setFilterValue,
    setFavoritePlayer,
    setPlayerColor
} = inputSlice.actions

export default inputSlice.reducer;
