import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
  useCustom
} from '@table-library/react-table-library/table';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { useTheme } from '@table-library/react-table-library/theme';

interface Props {
  data: { nodes: never[] };
}

const TransactionsTable = ({ data }: Props) => {
  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const THEME = {
    HeaderRow: `
          &.header-row {
            background-color: #f5f5f5;
            color:rgba(0, 0, 0, 0.54);
          }
        `,
    Cell: `
          &.status-initiated > div {
            max-width: 5em;
            text-align: center;
            background: #a9d9ff;
            color: #007fff
          }
        `
  };
  const theme = useTheme([materialTheme, THEME]);
  
  return (
    <Table data={data} theme={theme}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow className='header-row'>
              <HeaderCell>DATE</HeaderCell>
              <HeaderCell>GROSS AMOUNT</HeaderCell>
              <HeaderCell>STATUS</HeaderCell>
              <HeaderCell>CUSTOMER</HeaderCell>
              <HeaderCell>SWIFTER ID</HeaderCell>
              <HeaderCell>EXTERNAL ID</HeaderCell>
              <HeaderCell>SOURCE</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.external_id} item={item}>
                <Cell>
                  {new Date(
                    item.date
                  ).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Cell>
                <Cell>
                  ${item.gross_amount}
                </Cell>
                <Cell className={`status-${item.status}`}>{item.status}</Cell>
                <Cell>{item.customer}</Cell>
                <Cell>{item.swifter_id}</Cell>
                <Cell>{item.external_id}</Cell>
                <Cell>{item.source}</Cell>

              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default TransactionsTable;