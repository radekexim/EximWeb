import { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { styled } from '@mui/system'
import { v4 as uuid } from 'uuid'

import LinearProgressWithLabel from '../Elements/LinearProgressWithLabel'

export const StyledTableHead = styled(TableHead)`
  & .MuiTableCell-root {
    background-color: #f3f4f6;
  }
`

export const OrderTable = ({ setposition, data }) => {
  const columns = [
    'Pozycja',
    'Konstrukcja',
    'Sztuki',
    'Uw',
    'Sw',
    'Powierzchnia',
    'Waga',
    'Metry',
    'Kolor',
    'Opis',
    'Postęp',
    'Obrazek',
  ]
  const [isSelected, setIsSelected] = useState('001')
  function setPosition(value) {
    setIsSelected(value)
    setposition(value)
  }

  return (
    <Card sx={{ height: '100%', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)' }} key={uuid()}>
      <PerfectScrollbar key={uuid()}>
        <Box sx={{ minWidth: 800 }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table key={uuid()} stickyHeader size='small'>
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
                  <TableRow
                    hover
                    key={row.pozycja}
                    selected={row.pozycja === isSelected}
                    onClick={() => setPosition(row.pozycja)}
                  >
                    <TableCell key={uuid()}>{row.pozycja}</TableCell>
                    <TableCell key={uuid()}>{row.konstrukcja}</TableCell>
                    <TableCell key={uuid()}>{row.sztuki}</TableCell>
                    <TableCell key={uuid()}>{row.uw ? row.uw.toFixed(2) : null}</TableCell>
                    <TableCell key={uuid()}>{row.sw ? row.sw.toFixed(2) : null}</TableCell>
                    <TableCell key={uuid()}>{row.powierzchnia}</TableCell>
                    <TableCell key={uuid()}>{row.waga ? row.waga.toFixed(2) : null}</TableCell>
                    <TableCell key={uuid()}>{row.metry}</TableCell>
                    <TableCell key={uuid()}>{row.kolor}</TableCell>
                    <TableCell key={uuid()}>{row.opis}</TableCell>
                    <TableCell key={uuid()}>
                      <LinearProgressWithLabel
                        value={Number(((row.progress / (row.sztuki * 12)) * 100).toFixed())}
                      />
                    </TableCell>
                    <TableCell key={uuid()}>
                      <img height='80' src={`data:image/png;base64,${row.obrazek}`} alt='' />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}
