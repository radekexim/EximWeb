import PerfectScrollbar from 'react-perfect-scrollbar'

import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material'
import { styled } from '@mui/system'
import { v4 as uuid } from 'uuid'

export const StyledTableHead = styled(TableHead)`
  & .MuiTableCell-root {
    background-color: #f3f4f6;
  }
`

export const ConstructionTable = ({ data, title, columns }) => {
  const subtotal = (items) => {
    const totalUnits = items.map((row) => Number(row.units)).reduce((sum, i) => sum + i, 0)
    const totalQuantity = items.map((row) => Number(row.value)).reduce((sum, i) => sum + i, 0)
    const obj = { totalUnits: totalUnits, totalQuantity: totalQuantity }

    return obj
  }

  const total = subtotal(data)
  return (
    <Card
      sx={{ height: '100%', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)' }}
      key={uuid()}
    >
      <CardHeader title={title} />
      <PerfectScrollbar key={uuid()}>
        <Box>
          <Table key={uuid()}>
            <StyledTableHead key={uuid()}>
              <TableRow key={uuid()}>
                {columns.map((column) => (
                  <TableCell key={uuid()}>{column}</TableCell>
                ))}
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow hover key={uuid()}>
                  <TableCell key={uuid()}>{row.name}</TableCell>
                  <TableCell key={uuid()}>{row.value}</TableCell>
                  <TableCell key={uuid()}>{row.units}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter sx={{ backgroundColor: '#F3F4F6' }}>
              <TableRow>
                <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Razem</TableCell>
                <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {total.totalQuantity.toFixed(2)}
                </TableCell>
                <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {total.totalUnits.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}
