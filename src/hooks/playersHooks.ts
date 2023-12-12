import { useDispatch, useSelector } from 'react-redux'

import { useSearchPlayersQuery } from '../api/apiSlice'
import { getFavoritePlayers, getPlayersSearchParams } from '../state/selectors'
import { setFavoritePlayer, setPlayerColor } from '../state/slices/inputSlice'
import { PlayerApiData } from '../app-types'

export function usePlayersQueryResult() {
    const searchParams = useSelector(getPlayersSearchParams)
    const queryResult = useSearchPlayersQuery(searchParams)
    return queryResult
}

export function useFavoritePlayers() {

    const dispatch = useDispatch()
    const { favoritePlayerIds, favoritePlayers } = useSelector(getFavoritePlayers)

    const isFavorite = (playerId: number) => !!favoritePlayers[playerId]

    const setFavorite = (player: PlayerApiData, value: boolean) => dispatch(setFavoritePlayer({
        player,
        value,
    }))

    const _setPlayerColor = (playerId: number, color: string) => {
        dispatch(setPlayerColor({ playerId, color }))
    }

    return {
        favoritePlayerIds,
        favoritePlayers,
        isFavorite,
        setFavorite,
        setPlayerColor: _setPlayerColor,
    }
}