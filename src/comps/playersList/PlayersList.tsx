import styled from 'styled-components'
import { useFavoritePlayers, usePlayersQueryResult } from '../../hooks/playersHooks'
import PlayerItem from './PlayerItem'
import PlayersListFilters from './PlayersListFilters'
import PlayersListPagination from './PlayersListPagination'

const Container = styled.div`
    .list-container {
        background: white;
        border: solid 1px #c5d0d5;
        padding: 10px;
        border-radius: 3px;
        overflow: auto;
        max-height: 50vh;
    }
`

export default function PlayersList() {

    const {
        data: playersSearchResult,
        isSuccess, isError, isFetching
    } = usePlayersQueryResult()

    const {
        isFavorite,
        setFavorite,
    } = useFavoritePlayers()

    const filteredPlayers = playersSearchResult?.data
    const hasPlayers = isSuccess && !!filteredPlayers.length
    let listOrMessage

    if (isFetching) {
        listOrMessage = 'Loading players data...'
    }
    else if (isSuccess) {
        listOrMessage = (
            <div className="flx flx-col gap-sm list-container">
                { hasPlayers
                    ? filteredPlayers.map(
                        (player: any) =>
                            <PlayerItem key={ player.id }
                                player={ player }
                                favorite={ isFavorite(player.id) }
                                setFavorite={ (value: boolean) => setFavorite(player, value) }
                            />
                    )
                    : <div>No search matches.</div>
                }
            </div>
        )
    }
    else if (isError) {
        listOrMessage = 'Failed to fetch players data.'
    }

    return (
        <Container className="flx flx-col gap-md">
            <PlayersListFilters />
            { listOrMessage }
            { hasPlayers && <PlayersListPagination /> }
        </Container>
    )
}
