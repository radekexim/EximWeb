import { useState } from 'react'

import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { Button, Grid, TextField, Typography } from '@mui/material'

export default function FilterOrdersBox({ orders, setorders }) {
  const [AllOrders] = useState(orders)
  const [orderId, setOrderId] = useState('')
  const [offerId, setOfferId] = useState('')
  const [client, setClient] = useState('')
  const [reference, setReference] = useState('')
  const [address, setAddress] = useState('')
  const [trader, setTrader] = useState('')
  const [deadline, setDeadline] = useState('')

  const filterHandle = () => {
    let filterOrders = AllOrders.filter((order) => order.tradedocid.includes(orderId))
      .filter((order) => (order.offerid === null ? false : order.offerid.includes(offerId)))
      .filter((order) =>
        order.ne === null ? false : order.ne.toUpperCase().includes(client.toUpperCase()),
      )
      .filter((order) =>
        order.reference === null
          ? false
          : order.reference.toUpperCase().includes(reference.toUpperCase()),
      )
      .filter((order) =>
        order.addressdelivery === null
          ? false
          : order.addressdelivery.toUpperCase().includes(address.toUpperCase()),
      )
      .filter((order) =>
        order.users === null ? false : order.users.toUpperCase().includes(trader.toUpperCase()),
      )
      .filter((order) =>
        deadline === '' ? true : order.weeknumber_realization === Number(deadline),
      )
    setorders(filterOrders)
  }

  return (
    <>
      <Typography variant='h6' align='center' color='text.secondary' sx={{ marginBottom: 1 }}>
        Filtry
      </Typography>
      <Grid
        container
        item
        xs={4}
        sm={8}
        md={12}
        direction='row'
        justifyContent='flex-start'
        spacing={2}
        sx={{ marginBottom: 0, marginLeft: 1 }}
      >
        <Grid item>
          <TextField
            id='id_order'
            label='Id zlecenia'
            size='small'
            variant='outlined'
            value={orderId}
            onChange={(event) => setOrderId(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            id='id_offer'
            label='Id oferty'
            size='small'
            variant='outlined'
            value={offerId}
            onChange={(event) => setOfferId(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            id='client'
            label='Klient'
            size='small'
            variant='outlined'
            value={client}
            onChange={(event) => setClient(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            id='reference'
            label='Referencja'
            size='small'
            variant='outlined'
            value={reference}
            onChange={(event) => setReference(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            id='address'
            label='Adres dostawy'
            size='small'
            variant='outlined'
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            id='trader'
            label='Opiekun'
            size='small'
            variant='outlined'
            value={trader}
            onChange={(event) => setTrader(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            id='deadline'
            label='Termin'
            size='small'
            variant='outlined'
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            startIcon={<FilterAltIcon />}
            color='primary'
            onClick={filterHandle}
            size='medium'
          >
            Filtruj
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
