import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import TextInput from '../basic/textInput/TextInput'
import { filterKeys, setFilterValue } from '../../state/slices/inputSlice'
import Button from '../basic/textInput/Button'

const SearchBar = styled.div`
    align-items: flex-end;
    width: 100%;
    .search-btn {
        height: 38px;
    }
    .search-input {
        flex-grow: 1;
    }
`

export default function PlayersListFilters() {
    const dispatch = useDispatch()

    const [ nameSearchQuery, setNameSearchQuery ] = useState('')

    const onSearchClick = () => {
        dispatch(setFilterValue({
            filterKey: filterKeys.page,
            filterValue: 1,
        }))
        dispatch(setFilterValue({
            filterKey: filterKeys.playerName,
            filterValue: nameSearchQuery,
        }))
    }

    return (
        <div className="flx flx-col gap-sm">
            <SearchBar className="flx flx-row gap-xs">
                <TextInput
                    label="Search players by name"
                    value={ nameSearchQuery }
                    onChange={ e => setNameSearchQuery(e.target.value) }
                    className="search-input"
                />
                <Button
                    onClick={ onSearchClick }
                    className="search-btn"
                >Search</Button>
            </SearchBar>
        </div>
    )
}
