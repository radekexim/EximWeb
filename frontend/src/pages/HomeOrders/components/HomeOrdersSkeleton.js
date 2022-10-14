import { Grid, Skeleton } from '@mui/material'
import { Box } from '@mui/system'

export default function HomeOrdersSkeleton() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%' }}>
            <Skeleton width='100%'>
              <div style={{ paddingTop: '3%' }} />
            </Skeleton>
          </Box>
        </Box>
      </Grid>
      <Grid item xs>
        <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
          <Skeleton variant='rectangular' width='100%'>
            <div style={{ paddingTop: '40%' }} />
          </Skeleton>
        </Box>
      </Grid>
    </Grid>
  )
}
