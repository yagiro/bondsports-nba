import styled from 'styled-components'
import type { PlayerApiData } from '../../app-types'
import Button from '../basic/textInput/Button'
import { ReactElement, ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode;
    className: string;
    favorite: boolean;
}

const Container: (props: ContainerProps) => ReactElement = styled.div`
    padding: 10px;
    border: solid 1px #e4e4e4;
    border-radius: 4px;
    align-items: flex-start;
    max-width: 500px;
    button {
        height: 30px;
        ${ (props) => props.favorite && 'background: #ffbd6c;' }
    }
    .details {
        width: 100%;
        justify-content: space-between;
    }
`

interface PlayerItemsProps {
    player: PlayerApiData;
    favorite: boolean;
    setFavorite: (value: boolean) => any;
}

export default function PlayerItem({ player, favorite, setFavorite }: PlayerItemsProps) {
    const { id, first_name, last_name } = player
    return (
        <Container className="flx flx-col" favorite={ favorite }>
            <div className="flx flx-row details">
                <div className="flx flx-col">
                    <div><b>{ first_name } { last_name }</b></div>
                    <div>#{ id }</div>
                </div>
                {
                    !favorite
                        ? <Button onClick={ () => setFavorite(true) }>Save</Button>
                        : <Button onClick={ () => setFavorite(false) }>Remove</Button>
                }
            </div>
        </Container>
    )
}
