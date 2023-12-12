import styled from 'styled-components'
import type { PlayerData } from '../../app-types'
import { useState } from 'react'
import Button from '../basic/textInput/Button'

const Container = styled.div`
    background:${ ({ color }) => color };
    padding: 10px;
    border: solid 1px #e4e4e4; // #d0c665;
    border-radius: 4px;
    align-items: flex-start;
    min-width: 170px;
    max-width: 500px;
`

interface FavoritePlayerItemsProps {
    player: PlayerData;
    setFavorite: (value: boolean) => any;
    setPlayerColor: (color: string) => any;
}

const colors = [
    '#ffc1c1',
    '#ffe495',
    '#f4f4f4',
    '#a1cfdc',
    '#ffdbfd',
]

interface ColorThumbProps {
    selected?: boolean;
    color?: string;
    onClick?: () => any;
}

const ColorThumb: (props: ColorThumbProps) => any = styled.div`
    width: 20px;
    height: 20px;
    background: ${ props => props.color };
    cursor: pointer;
    border: solid 1px darkgrey;
`

interface ColorPickerProps {
    value?: string;
    onChange: (color: string) => any;
}

const ColorsContainer = styled.div`
    padding: 7px;
    border-radius: 5px;
    background: white;
`

function ColorPicker(props: ColorPickerProps) {
    return (
        <ColorsContainer className="flx flx-row gap-xs">
            { colors.map(color =>
                <ColorThumb
                    key={ color }
                    color={ color }
                    selected={ color === props.value }
                    onClick={ () => props.onChange(color) }
                />) }
        </ColorsContainer>
    )
}

export default function FavoritePlayerItem({ player, setFavorite, setPlayerColor }: FavoritePlayerItemsProps) {
    const { id, first_name, last_name, color } = player
    const [ showColorPicker, setColorPickerOpen ] = useState(false)
    return (
        <Container className="flx flx-col gap-sm" color={ color }>
            <div className="flx flx-col gap-xs">
                <div><b>{ first_name } { last_name }</b></div>
                <div>{ id }</div>
                <div className="flx flx-row gap-xs">
                    <Button onClick={ () => setFavorite(false) }>Remove</Button>
                    <Button onClick={ () => setColorPickerOpen(!showColorPicker) }>Color</Button>
                </div>
            </div>
            { showColorPicker &&
                <ColorPicker
                    value={ player.color }
                    onChange={ color => {
                        setPlayerColor(color);
                        setColorPickerOpen(false);
                    } }
                />
            }
        </Container>
    )
}
