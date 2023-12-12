import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { usePlayersQueryResult } from '../../hooks/playersHooks'
import { filterKeys, setFilterValue } from '../../state/slices/inputSlice'
import Button from '../basic/textInput/Button'

const Row = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={ 'flx flx-row gap-xs ' + (props.className ?? '') }>
        { props.children }
    </div>
)

const Container = styled.div`
    width: 100%;
    align-items: stretch;
    
    .page-selection {
        justify-content: space-between;
    }
`

const options = [ 25, 50, 75, 100 ]

interface QtySelectorProps  {
    value: number;
    options: number[];
    onChange: (opt: number) => any;
}

const QtyContainer = styled(Row)`
    gap: 0;
    padding-left: 4px;
    .qty-btn {
        border-radius: 0;
        margin-left: -2px;
        &.selected {
            background: #ffbd6c;
        }
    }
`

function QtySelector(props: QtySelectorProps ) {
    const { value, options, onChange } = props
    return (
        <QtyContainer>
            { options.map(opt =>
                <Button key={opt}
                    onClick={ () => onChange(opt) }
                    className={ "qty-btn " + (value === opt ? 'selected' : '') }
                >
                        { opt }
                </Button>)
            }
        </QtyContainer>
    )
}

export default function PlayersListPagination() {
    
    const dispatch = useDispatch()
    const {
        data: playersSearchResult,
        isFetching,
    } = usePlayersQueryResult()

    let current_page: number = 0 , total_pages: number = 0, per_page: number = 0
    if (!isFetching) {
        ({ current_page, total_pages, per_page } = playersSearchResult.meta)
    }

    const setPageFilter = (pageNum: number) => dispatch(setFilterValue({
        filterKey: filterKeys.page,
        filterValue: pageNum,
    }))

    const setPageSizeFilter = (pageSize: number) => {
        dispatch(setFilterValue({
            filterKey: filterKeys.page,
            filterValue: 1,
        }))
            dispatch(setFilterValue({
                filterKey: filterKeys.pageSize,
                filterValue: pageSize,
            }))
    }

    return (
        <Container className="flx flx-col gap-sm">
            <Row className="page-selection">
                <Row>
                    <Button
                        onClick={ () => setPageFilter(1) }
                        disabled={ current_page === 1 || isFetching }
                    >
                        &lt;&lt;
                    </Button>
                    <Button
                        onClick={ () => setPageFilter(current_page-1) }
                        disabled={ current_page === 1 || isFetching }
                    >&lt;
                    </Button>
                </Row>
                { !current_page
                    ? <div>...</div>
                    : <div>{ current_page } / { total_pages }</div>
                }
                <Row>
                    <Button
                        onClick={ () => setPageFilter(current_page+1) }
                        disabled={ current_page === total_pages || isFetching }
                    >&gt;
                    </Button>
                    <Button
                        onClick={ () => setPageFilter(total_pages) }
                        disabled={ current_page === total_pages || isFetching }
                    >
                        &gt;&gt;
                    </Button>
                </Row>
            </Row>
            <Row>
                <div>Page size</div>
                <QtySelector
                    value={ per_page }
                    options={ options }
                    onChange={ setPageSizeFilter }
                />
            </Row>

        </Container>
    )
}