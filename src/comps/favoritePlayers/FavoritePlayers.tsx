import styled from 'styled-components'
import { useFavoritePlayers } from '../../hooks/playersHooks'
import FavoritePlayerItem from '../playersList/FavoritePlayerItem'

const Container = styled.div`
    border: solid 1px #c5d0d5;
    border-radius: 3px;
    padding: 10px;
    padding-top: 2px;
    min-width: 250px;
    background: white;

    .list-container {
        overflow: auto;
        max-height: 70vh;
    }
`

export default function FavoritePlayers() {

    const {
        favoritePlayerIds,
        favoritePlayers,
        setFavorite,
        setPlayerColor,
    } = useFavoritePlayers()

    return (
        <Container className="flx flx-col gap-sm">
            <div className="header1">Favorites</div>
            <div className="flx flx-col gap-sm list-container">
                { !favoritePlayerIds.length ? 'Save your favorite players!'
                    : favoritePlayerIds.map(id => {
                        const player = favoritePlayers[id]
                        return (
                            <FavoritePlayerItem key={id}
                                player={ player }
                                setFavorite={ (value) => setFavorite(player, value) }
                                setPlayerColor={ color => setPlayerColor(player.id, color) }
                            />)
                    })
                }
            </div>
        </Container>
    )
}
