import { useEffect, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import LinearProgressWithLabel from '../../../components/UI/Elements/LinearProgressWithLabel'
import { SeverityPill } from '../../../components/UI/Elements/Severity-Pill'

export default function TransportRow(props) {
  const { row } = props
  const [openOrders, setOpenOrders] = useState(false)
  const [ordersClient, setOrdersClient] = useState('')
  const [clientAddress, setClientAddress] = useState('')

  const getInformationOrdersByClient = (ordersTable) => {
    let newordersClient = []
    const clientAddress = ordersTable
      .map((order) => order.addressdelivery)
      .filter((v, i, a) => a.indexOf(v) === i)
    ordersTable.forEach((order) => {
      newordersClient.push(order.tradedocid)
    })
    setClientAddress(clientAddress)
    setOrdersClient(newordersClient.join())
  }

  useEffect(() => {
    getInformationOrdersByClient(row.orders)
  }, [row.orders])

  return (
    <>
      <TableRow
        key={row.id}
        sx={{
          '& > *': { borderBottom: 'unset', backgroundColor: openOrders ? '#e1f5fe' : 'white' },
        }}
      >
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpenOrders(!openOrders)}
          >
            {openOrders ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row' align='center'>
          {row.id}
        </TableCell>
        <TableCell align='center'>{row.client}</TableCell>
        <TableCell align='center'>{clientAddress}</TableCell>
        <TableCell align='center'>{ordersClient}</TableCell>
        <TableCell align='center'>{row.id}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={openOrders} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Zlecenia
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Id zlecenia</TableCell>
                    <TableCell>Id oferty</TableCell>
                    <TableCell align='right'>Opiekun</TableCell>
                    <TableCell align='right'>Klient</TableCell>
                    <TableCell align='right'>Referencja</TableCell>
                    <TableCell align='right'>Adres dostawy</TableCell>
                    <TableCell align='right'>Progres</TableCell>
                    <TableCell align='right'>Status</TableCell>
                    <TableCell align='right'>Termin</TableCell>
                    <TableCell align='right'>Wartość</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orders.map((Row) => (
                    <TableRow key={Row.tradedocid}>
                      <TableCell component='th' scope='row'>
                        {Row.tradedocid}
                      </TableCell>
                      <TableCell>{Row.offerid}</TableCell>
                      <TableCell align='right'>{Row.users}</TableCell>
                      <TableCell align='right'>{Row.ne}</TableCell>
                      <TableCell align='right'>{Row.reference}</TableCell>
                      <TableCell align='right'>{Row.addressdelivery}</TableCell>
                      <TableCell align='right'>
                        <LinearProgressWithLabel value={Number(Row.progress)} />
                      </TableCell>
                      <TableCell align='right'>
                        <SeverityPill
                          color={
                            (Row.status === 'Otwarte' && 'error') ||
                            (Row.status === 'Zablokowane' && 'info') ||
                            (Row.status === 'W produkcji' && 'warning') ||
                            (Row.status === 'Zakończone' && 'success')
                          }
                        >
                          {Row.status}
                        </SeverityPill>
                      </TableCell>
                      <TableCell align='right'>{Row.weeknumber_realization}</TableCell>
                      <TableCell align='right'>{Row.value_sale}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
