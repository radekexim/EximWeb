import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { fetchOrders, selectAllOrders } from '../HomeOrders/orderSlice'
import { TransportToPrint } from './PrintTransport/TransportToPrint'
import { getInformationToPrint } from './PrintTransport/helpers/getInformationToPrint'
import TransportTable from './TransportsPageComponents/TransportTable'
import { fetchTransports, selectAllTransports } from './transportSlice'

export default function TransportPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const transports = useSelector(selectAllTransports)
  const transportStatus = useSelector((state) => state.transports.status)
  const allOrders = useSelector(selectAllOrders)
  const [transportData, setTransportData] = useState([])
  const [transportInformationToPrint, setTransportInformationToPrint] = useState()
  const [print, setPrint] = useState(false)
  // Drukowanie
  const componentRef = useRef()
  const printTransport = async (id) => {
    const transport = await getInformationToPrint(transportData, id)
    setTransportInformationToPrint(transport)
    console.log(transport)

    setPrint(true)
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  useEffect(() => {
    print && handlePrint()
    setPrint(false)
  }, [print])

  async function getTransportData(transports, orders) {
    let transportData = transports.map((transport) => {
      let data = []
      let data2 = []
      transport.transportOrders.forEach((id) => {
        let order = orders.filter((order) => order.tradedocid === id)
        data.push(order[0])
      })
      const transportClients = data.map((order) => order.ne).filter((v, i, a) => a.indexOf(v) === i)
      let i = 0
      transportClients.forEach((client) => {
        data2.push({ id: i, client: client, orders: data.filter((order) => order.ne === client) })
        i++
      })
      return {
        ...transport,
        ordersData: data2,
      }
    })
    setTransportData(transportData)
  }

  async function addTransport() {
    navigate({
      pathname: '/DodajTransport',
    })
  }

  const fetchData = useCallback(async () => {
    await dispatch(fetchOrders())
    await dispatch(fetchTransports())
  }, [dispatch])

  useEffect(() => {
    if (transportStatus === 'idle') {
      fetchData()
    }
    getTransportData(transports, allOrders)
  }, [transportStatus])

  return (
    <Paper
      sx={{ margin: 'auto', overflow: 'hidden', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)' }}
    >
      <Typography variant='h4' align='center' color='text.secondary' sx={{ marginBottom: 1 }}>
        Listy transportowe
      </Typography>
      <Typography component={'div'} sx={{ my: 2, mx: 2 }} color='text.secondary' align='left'>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          color='success'
          onClick={addTransport}
          size='large'
        >
          Dodaj transport
        </Button>
      </Typography>
      <Typography component={'div'} sx={{ my: 2, mx: 2 }} color='text.secondary' align='center'>
        <TransportTable rows={transportData} printtable={printTransport} />
      </Typography>
      <div style={{ display: 'none' }}>
        <TransportToPrint ref={componentRef} data={transportInformationToPrint} />
      </div>
    </Paper>
  )
}
