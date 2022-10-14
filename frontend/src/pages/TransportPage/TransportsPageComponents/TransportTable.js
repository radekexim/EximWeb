import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { styled } from '@mui/system'

import Row from './Row'

const CustomTableHead = styled('thead')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}))

export default function TransportTable({ rows, printtable }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <CustomTableHead>
          <TableRow>
            <TableCell />
            <TableCell>Data</TableCell>
            <TableCell align='right'>Nazwa</TableCell>
            <TableCell align='right'>Dostawca</TableCell>
            <TableCell align='right'>Samochód</TableCell>
            <TableCell align='right'>Koszt dostawy</TableCell>
            <TableCell align='right'>Wartość zamówień </TableCell>
            <TableCell align='right'>Procent wartości</TableCell>
            <TableCell align='right'>Akcje</TableCell>
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} printtable={printtable} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
