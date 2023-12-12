import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'


const Container: React.FC<TextInputProps> = styled.div`
`

const InputContainer: React.FC<TextInputProps> = styled.div`
    background: white;
    padding: 4px;
    outline: none;
    border: solid 1px grey;
    border-radius: 4px;
`

const StyledInput = styled.input`
    outline: none;
    border: none;
    font-size: 1rem;
    font-family: 'Afacad', sans-serif;
    width: 100%;
`

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function TextInput(props: TextInputProps) {
    const { label, className, ...moreProps } = props
    return (
        <Container className={ 'flx flx-col gap-xs ' + (className ?? '') }>
            { !!label && <div>{ label }</div> }
            <InputContainer className="flx input-container">
                <StyledInput className="input" type="text" { ...moreProps } />
            </InputContainer>
        </Container>
    )
}
