import PerfectScrollbar from 'react-perfect-scrollbar'

import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { styled } from '@mui/system'
import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'

export const StyledTableHead = styled(TableHead)`
  & .MuiTableCell-root {
    background-color: #f3f4f6;
  }
`

export const MaterialTable = ({ data, title }) => {
  const columns = Object.keys(data[0])
  return (
    <Card
      sx={{ height: '100%', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)' }}
      key={uuid()}
    >
      <CardHeader title={title} />
      <PerfectScrollbar key={uuid()}>
        <Box sx={{ minWidth: 800 }}>
          <Table key={uuid()}>
            <StyledTableHead key={uuid()}>
              <TableRow key={uuid()}>
                {columns.map((column) => (
                  <TableCell key={uuid()}>
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </TableCell>
                ))}
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow hover key={uuid()}>
                  <TableCell key={uuid()}>{row.stanowisko}</TableCell>
                  <TableCell key={uuid()}>
                    {format(new Date(row.skanowanie), 'dd-MM-yyyy hh:mm:ss')}
                  </TableCell>
                  <TableCell key={uuid()}>{row.zlecenie}</TableCell>
                  <TableCell key={uuid()}>{row.pozycja}</TableCell>
                  <TableCell key={uuid()}>{row.konstrukcja}</TableCell>
                  <TableCell key={uuid()}>
                    <img height='80' src={`data:image/png;base64,${row.obrazek}`} alt='' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <Button
          color='primary'
          endIcon={<ArrowRightIcon fontSize='small' />}
          size='small'
          variant='text'
        >
          View all
        </Button>
      </Box>
    </Card>
  )
}
