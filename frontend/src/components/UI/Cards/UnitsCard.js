import * as React from 'react'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import Title from '../Title'

export default function UnitsCard({ productionUnits, salesUnits }) {
  const date = new Date().toLocaleDateString('pl-PL')
  const sumUnits = (obj) => {
    let sum = 0
    for (const key in obj) {
      sum += Number(obj[key].units)
    }
    return sum.toFixed(2)
  }

  return (
    <Paper elevation={4} sx={{ maxWidth: 1200, margin: 'auto', overflow: 'hidden' }}>
      <Typography component={'div'} sx={{ my: 2, mx: 1 }} color='text.secondary' align='center'>
        <Title>Jednostki wyprodukowane</Title>
        <Typography component='p' variant='h4'>
          {sumUnits(productionUnits)}
        </Typography>
        <Typography color='text.secondary' sx={{ flex: 1 }}>
          {`Na dzień ${date}`}
        </Typography>
      </Typography>
      <Typography component={'div'} sx={{ my: 2, mx: 2 }} color='text.secondary' align='center'>
        <Title>Jednostki sprzedane</Title>
        <Typography component='p' variant='h4'>
          {sumUnits(salesUnits)}
        </Typography>
        <Typography color='text.secondary' sx={{ flex: 1 }}>
          {`Na dzień ${date}`}
        </Typography>
      </Typography>
    </Paper>
  )
}
