import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import Row from './Row'

export default function CollapsibleTable({ rows, deletefunction }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Klient</TableCell>
            <TableCell align='right'>Liczba zleceń</TableCell>
            <TableCell align='right'>Wartość</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} deletefunction={deletefunction} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
