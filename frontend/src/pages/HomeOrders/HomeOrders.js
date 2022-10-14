import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Tab } from '@mui/material'

import Snackbar from '../../components/UI/Elements/Snackbars'
import HomeOrdersSkeleton from './components/HomeOrdersSkeleton'
import Orders from './components/Orders'
import { fetchOrders, selectAllComplaints, selectAllOrders } from './orderSlice'

export default function HomeOrders() {
  const dispatch = useDispatch()
  const orders = useSelector(selectAllOrders)
  const complaints = useSelector(selectAllComplaints)

  const orderStatus = useSelector((state) => state.orders.status)
  const error = useSelector((state) => state.orders.error)

  const [value, setValue] = useState('1')
  const tabChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (orderStatus === 'idle') {
      dispatch(fetchOrders())
    }
  }, [orderStatus, dispatch])

  return orderStatus === 'loading' ? (
    <HomeOrdersSkeleton />
  ) : orderStatus === 'succeeded' ? (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={tabChange} aria-label='lab API tabs example'>
            <Tab label='Zlecenia' value='1' />
            <Tab label='Reklamacje' value='2' />
            <Tab label='ALU' value='3' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <Orders orders={orders} />
          <Snackbar status={orderStatus} />
        </TabPanel>
        <TabPanel value='2'>
          <Orders orders={complaints} />
          <Snackbar status={orderStatus} />
        </TabPanel>
        <TabPanel value='3'></TabPanel>
      </TabContext>
    </>
  ) : (
    <div>{error}</div>
  )
}
