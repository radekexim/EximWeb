import { useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

import { Tooltip } from '@mui/material'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import LinearProgressWithLabel from '../../../components/UI/Elements/LinearProgressWithLabel'
import { SeverityPill } from '../../../components/UI/Elements/Severity-Pill'
import DataTable from '../../../components/UI/Tables/DataTable'
import FilterOrdersBox from './FilterOrdersBox'

const columns = [
  {
    field: 'tradedocid',
    headerName: 'Id zlecenia',
    width: 90,
    headerClassName: 'data-table-header',
  },
  { field: 'offerid', headerName: 'Id oferty', width: 90, headerClassName: 'data-table-header' },
  { field: 'users', headerName: 'Opiekun', width: 150, headerClassName: 'data-table-header' },
  {
    field: 'date',
    headerName: 'Data utworzenia',
    type: 'date',
    width: 120,
    headerClassName: 'data-table-header',
  },
  {
    field: 'ne',
    headerName: 'Klient',
    width: 250,
    headerClassName: 'data-table-header',
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
    headerClassName: 'data-table-header',
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
    headerClassName: 'data-table-header',
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <span>{params.value}</span>
      </Tooltip>
    ),
  },
  {
    field: 'colors',
    headerName: 'Kolor',
    width: 250,
    headerClassName: 'data-table-header',
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <span>{params.value}</span>
      </Tooltip>
    ),
  },
  {
    field: 'datestartingproduction',
    headerName: 'Start produkcji',
    type: 'date',
    width: 150,
    headerClassName: 'data-table-header',
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
    headerClassName: 'data-table-header',
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
    headerClassName: 'data-table-header',
  },
  {
    field: 'weeknumber_realization',
    headerName: 'Termin',
    width: 60,
    headerClassName: 'data-table-header',
  },
  {
    field: 'date_delivery',
    headerName: 'Data dostawy',
    type: 'date',
    flex: 1,
    minWidth: 105,
    headerClassName: 'data-table-header',
  },
  { field: 'value_sale', headerName: 'Wartość', width: 100, headerClassName: 'data-table-header' },
]

export default function Orders(props) {
  const [orders, setOrders] = useState(props.orders)
  const navigate = useNavigate()
  const handleRowClick = (params) => {
    navigate({
      pathname: '/Zamowienie',
      search: createSearchParams({
        id: params.row.tradedocid,
      }).toString(),
    })
  }

  return (
    <Paper
      sx={{
        margin: 'auto',
        overflow: 'hidden',
        mx: 1,
        boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
      }}
    >
      <FilterOrdersBox orders={props.orders} setorders={setOrders} />
      <Typography component={'div'} sx={{ my: 1, mx: 2 }} color='text.secondary' align='center'>
        <DataTable columns={columns} rows={orders} onRowClick={handleRowClick} />
      </Typography>
    </Paper>
  )
}
