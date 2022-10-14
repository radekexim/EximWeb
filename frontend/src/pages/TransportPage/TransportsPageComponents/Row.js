import { useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PrintIcon from '@mui/icons-material/Print'
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'

import DeleteTransportButton from './DeleteTransportButton'
import TransportRow from './TransportRow'

export default function Row({ row, printtable }) {
  const [openTransport, setOpenTransport] = useState(false)

  return (
    <>
      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset', backgroundColor: openTransport ? '#90caf9' : 'white' },
        }}
      >
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpenTransport(!openTransport)}
          >
            {openTransport ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.date_delivery}
        </TableCell>
        <TableCell align='right'>{row.name}</TableCell>
        <TableCell align='right'>{row.supplier}</TableCell>
        <TableCell align='right'>{row.car}</TableCell>
        <TableCell align='right'>{row.cost_delivery}</TableCell>
        <TableCell align='right'>{row.totalsale}</TableCell>
        <TableCell align='right'>{row.margin_delivery.toFixed(2)}</TableCell>
        <TableCell align='right'>
          <IconButton>
            <EditIcon />
          </IconButton>
          <DeleteTransportButton
            deletefunction={() => console.log('usunięte')}
            name={row.name}
          ></DeleteTransportButton>
          <IconButton onClick={() => printtable(row.id)}>
            <PrintIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={openTransport} timeout='auto' unmountOnExit>
            <Table size='small' aria-label='purchases'>
              <TableHead sx={{ backgroundColor: '#bbdefb' }}>
                <TableRow>
                  <TableCell />
                  <TableCell align='center'>Miejsce</TableCell>
                  <TableCell align='center'>Klient</TableCell>
                  <TableCell align='center'>Adres dostawy</TableCell>
                  <TableCell align='center'>Zlecenia</TableCell>
                  <TableCell align='center'>Palety</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.ordersData.map((row) => (
                  <TransportRow key={row.id} row={row} open={openTransport} />
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
