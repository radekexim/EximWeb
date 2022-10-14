import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AddIcon from '@mui/icons-material/Add'
import { Box, Grid, IconButton, Tooltip } from '@mui/material'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import LinearProgressWithLabel from '../../../components/UI/Elements/LinearProgressWithLabel'
import { SeverityPill } from '../../../components/UI/Elements/Severity-Pill'
import DataTable from '../../../components/UI/Tables/DataTable'
import { fetchOrders, selectAllOrders } from '../../HomeOrders/orderSlice'
import { changeTransportOrders, selectAllTransportOrders } from '../transportSlice'
import FilterBox from './Components/FilterBox'

function DataOrdersTable(props) {
  const dispatch = useDispatch()
  const transportOrders = useSelector(selectAllTransportOrders)
  const [ordersTransport, setOrdersTransport] = useState(new Set())

  const columns = [
    {
      field: 'actions',
      headerName: 'Dodaj',
      width: 70,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              // backgroundColor: "whitesmoke",
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton onClick={() => addOrderToTransport(params.id)}>
              <AddIcon />
            </IconButton>
          </Box>
        )
      },
    },
    { field: 'tradedocid', headerName: 'Id zlecenia', width: 90 },
    { field: 'offerid', headerName: 'Id oferty', width: 90 },
    { field: 'users', headerName: 'Opiekun', width: 150 },
    {
      field: 'ne',
      headerName: 'Klient',
      width: 250,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: 'reference',
      headerName: 'Referencja',
      width: 250,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: 'addressdelivery',
      headerName: 'Adres dostawy',
      width: 250,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: 'progress',
      headerName: 'Progres',
      renderCell: (params) => <LinearProgressWithLabel value={Number(params.value)} />,
      width: 100,
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => (
        <SeverityPill
          color={
            (params.value === 'Otwarte' && 'error') ||
            (params.value === 'Zablokowane' && 'info') ||
            (params.value === 'W produkcji' && 'warning') ||
            (params.value === 'Zakończone' && 'success')
          }
        >
          {params.value === 'Zablokowane' ? 'Oczekujące' : params.value}
        </SeverityPill>
      ),
      width: 130,
    },
    { field: 'weeknumber_realization', headerName: 'Termin', width: 60 },
    { field: 'value_sale', headerName: 'Wartość', width: 100 },
  ]

  const options = {
    disableSelectionOnClick: true,
  }

  function addOrderToTransport(id) {
    let orderSet = new Set(ordersTransport)
    orderSet.add(id)
    const selectedRowData = props.filterorders.filter((row) => orderSet.has(row.id.toString()))
    dispatch(changeTransportOrders(selectedRowData))
  }
  useEffect(() => {
    let ordersId = new Set()
    transportOrders.forEach((el) => {
      ordersId.add(el.id)
    })
    setOrdersTransport(ordersId)
  }, [transportOrders])

  return (
    <Paper
      sx={{ margin: 'auto', overflow: 'hidden', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)' }}
    >
      <Typography variant='h4' align='center' color='text.secondary'>
        Zlecenia
      </Typography>
      <Typography component={'div'} sx={{ my: 2, mx: 2 }} color='text.secondary' align='center'>
        <DataTable options={options} columns={columns} rows={props.orders} />
      </Typography>
    </Paper>
  )
}

export default function TransportOrderList() {
  const dispatch = useDispatch()
  const allOrders = useSelector(selectAllOrders)
  const [allFilteringOrders, setFilteringOrders] = useState()
  const [orders, setOrders] = useState(allOrders)
  const orderStatus = useSelector((state) => state.orders.status)

  const filterOrders = (ordersTable) => {
    let filteringOrders = ordersTable
      .filter((order) => order.date_delivery === '---')
      .sort((a, b) => (a.weeknumber_realization < b.weeknumber_realization ? -1 : 1))
      .sort((a, b) => (a.cntorderstatus > b.cntorderstatus ? -1 : 1))
    setOrders(filteringOrders)
    setFilteringOrders(filteringOrders)
  }

  useEffect(() => {
    if (orderStatus === 'idle') {
      dispatch(fetchOrders())
    }
    filterOrders(allOrders)
  }, [orderStatus, dispatch, allOrders])

  return (
    <>
      <Grid item xs={3} sm={6} md={9}>
        <DataOrdersTable orders={orders} filterorders={allFilteringOrders} />
      </Grid>
      <Grid item xs={1} sm={2} md={3}>
        <FilterBox setorders={setOrders} orders={allFilteringOrders} />
      </Grid>
    </>
  )
}
