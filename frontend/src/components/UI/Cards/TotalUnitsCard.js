import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import MoneyIcon from '@mui/icons-material/Money'
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'

const sumUnits = (obj) => {
  let sum = 0
  for (const key in obj) {
    sum += Number(obj[key].units)
  }
  return sum.toFixed(2)
}

export const TotalUnitsCard = ({ label, units, percentdiff, downlabel }) => (
  <Card sx={{ height: '100%', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)' }} >
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color='textSecondary' gutterBottom variant='overline'>
            {`${label} [Jednostki]`}
          </Typography>
          <Typography color='textPrimary' variant='h4'>
            {sumUnits(units)}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 46,
              width: 46,
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      {percentdiff && (
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ArrowDownwardIcon color='error' />
          <Typography
            color='error'
            sx={{
              mr: 1,
            }}
            variant='body2'
          >
            {percentdiff}
          </Typography>
          <Typography color='textSecondary' variant='caption'>
            {downlabel}
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
)
