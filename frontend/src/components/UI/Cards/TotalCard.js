import { Card, CardContent, Grid, Typography } from '@mui/material'

export const TotalCard = ({ label, value }) => (
  <Card sx={{ height: '100%', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)' }} >
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color='textSecondary' gutterBottom variant='overline'>
            {label}
          </Typography>
          <Typography color='textPrimary' variant='h4'>
            {value}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)
