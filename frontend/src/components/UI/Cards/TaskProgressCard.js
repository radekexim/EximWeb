import InsertChartIcon from '@mui/icons-material/InsertChartOutlined'
import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material'

export const TasksProgressCard = ({ label, progress }) => (
  <Card sx={{ height: '100%', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)' }} >
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color='textSecondary' gutterBottom variant='overline'>
            {label}
          </Typography>
          <Typography color='textPrimary' variant='h4'>
            {`${((progress.units / 950) * 100).toFixed(2)} %`}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 46,
              width: 46,
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress value={(progress.units / 950) * 100} variant='determinate' />
      </Box>
    </CardContent>
  </Card>
)
