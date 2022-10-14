import RefreshIcon from '@mui/icons-material/Refresh'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Tooltip from '@mui/material/Tooltip'

export default function RefreshPage({ reload, progress }) {
  return (
    <Grid container spacing={1} alignItems='right' justifyContent='right'>
      <Grid item xs={6}>
        <Tooltip title='Reload'>
          <IconButton onClick={reload}>
            <RefreshIcon fontSize='large' sx={{ display: 'block', color: 'primary' }} />
          </IconButton>
        </Tooltip>
      </Grid>
      {progress === 'loading' && (
        <Grid item xs={12}>
          <Box sx={{ width: '100%', py: 2, px: 0 }}>
            <Grid justifyContent='center'>
              <LinearProgress />
            </Grid>
          </Box>
        </Grid>
      )}
    </Grid>
  )
}
