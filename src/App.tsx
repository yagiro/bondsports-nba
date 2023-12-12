import { Provider } from 'react-redux'
import { styled } from 'styled-components'

import './App.css';
import PlayersList from './comps/playersList/PlayersList'
import { store } from './state/store'
import FavoritePlayers from './comps/favoritePlayers/FavoritePlayers'

const MainContainer = styled.div`
  flex-wrap: wrap;
  max-width: 1024px;
  align-items: flex-start;
  width: calc(80%);
  padding: 50px;
  padding-top: 10px;
  justify-content: space-around;
  > * {
    flex-grow: 1;
  }
`

function App() {
  return (
    <Provider store={ store }>
      <div className="flx flx-cntr flx-col gap-md">
        <div className="top-title">NBA PLAYERS</div>
        <MainContainer className="flx flx-row gap-md">
          <PlayersList/>
          <FavoritePlayers/>
        </MainContainer>
      </div>
    </Provider>
  )
}

export default App;
