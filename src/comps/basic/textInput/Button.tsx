import { styled } from 'styled-components'

const StyledButton = styled.button`
    padding: 2px 8px;
    background: white;
    border: solid 2px #7c4e37;
    color: #7c4e37;
    font-family: 'Afacad', sans-serif;
    font-size: 0.8rem;
    border-radius: 5px;
    cursor: pointer;
    
    &:hover {
        background: #ffe8cc;
    }
`

export default function Button(props: any) {
    return (
        <StyledButton
            { ...props }
        />
    )
}