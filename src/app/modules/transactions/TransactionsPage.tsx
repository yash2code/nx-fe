import { useCallback, useEffect, useRef, useState } from 'react';
import {
    useCustom
} from '@table-library/react-table-library/table';
import { callApi } from 'src/app/utils/callApi';
import * as TYPES from '@table-library/react-table-library/types';
import SearchBar from './SearchBar';
import styled from 'styled-components';
import ExportButton from './ExportButton';
import TransactionsTable from './TransactionsTable';
import { GetQueryParams } from 'src/app/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableContainer = styled.div`
  width: 100%;
`;

const FlexContainer = styled.div`
  display:flex;
  width: 100%;
  justify-content:space-between;
  padding-bottom: 1em;
`;

export const Button = styled.button`
  background-color: #fff;
  color: black;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  padding: 8px 16px;

  &:hover {
    border:1px solid #007fff;
  }
`;

export const SearchInput = styled.input`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  color: #555;
  font-size: 16px;
  height: 40px;
  padding: 8px 16px;
  width: 100%;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border-color: #007fff;
    outline: none;
  }
`;

const Select = styled.select`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  color: #555;
  font-size: 16px;
  height: 40px;
  padding: 8px 16px;
  width: 9em;
  margin-right: 16px;

  &:focus {
    border-color: #007fff;
    outline: none;
  }

  option {
    background-color: #fff;
    color: #555;
  }
`;

const PaginationContainer = styled(FlexContainer)`
    justify-content: flex-end;
    margin-right: 4em;
    margin-top: 1em;
`;

const FlexEndContainer = styled(FlexContainer)`
        justify-content:flex-end
`;

const TransactionsPage = () => {
    const [data, setData] = useState({ nodes: [] });
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [page, setPage] = useState(1);

    const fetchData = useCallback(async (params: GetQueryParams) => {
        let url = `/transactions?search=${params.search}&page=${params.page}`;
        if (params.statusFilter) {
            url = `${url}&status=${params.statusFilter}`;
        }
        const result = await callApi.get(url);

        setData({ nodes: result.data });
    }, []);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);

    };

    const handlePrevPage = () => {
        setPage(prevPage => prevPage - 1);

    };

    useCustom('search', data, {
        state: { search },
        onChange: onSearchChange,
    });

    useCustom('statusFilter', data, {
        state: { statusFilter },
        onChange: onFilterChange,
    });

    function onFilterChange(_: TYPES.Action, state: TYPES.State) {
        fetchData({
            search,
            statusFilter: state.statusFilter,
            page:1,
        });
    }

    const timeout = useRef<ReturnType<typeof setTimeout>>();
    function onSearchChange(_: TYPES.Action, state: TYPES.State) {
        if (timeout.current) clearTimeout(timeout.current);

        timeout.current = setTimeout(
            () =>
                fetchData({
                    search: state.search,
                    statusFilter,
                    page:1
                }),
            500
        );
    }

    useEffect(() => {
        fetchData({
            search,
            statusFilter,
            page,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData, page]);

    const canGoToNextPage = data.nodes.length === 15;
    const canGoToPrevPage = page > 1;

    return (
        <Container>
            <FlexContainer>
                <SearchBar value={search} onChange={setSearch} />
                <FlexEndContainer>
                    <Select value={statusFilter ?? ""} onChange={e => setStatusFilter(e.target.value || '')}>
                        <option value="">All</option>
                        <option value="initiated">Initiated</option>
                        <option value="authorized">Authorized</option>
                        <option value="successful">Successful</option>
                        <option value="returned">Returned</option>
                        <option value="canceled">Canceled</option>
                    </Select>
                    <ExportButton params={{
                        search,
                        statusFilter,
                        page
                    }} />
                </FlexEndContainer>
            </FlexContainer>
            <TableContainer>
                <TransactionsTable data={data} />
            </TableContainer>
            <PaginationContainer>
                {canGoToPrevPage && <Button onClick={handlePrevPage}>Previous</Button>}
                {canGoToNextPage && <Button onClick={handleNextPage}>Next</Button>}
            </PaginationContainer>
        </Container>
    );
};

export default TransactionsPage