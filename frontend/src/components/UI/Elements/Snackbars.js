import * as React from 'react'

import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export default function CustomizedSnackbars({ status, text }) {
  const [open, setOpen] = React.useState(true)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {status === 'failed' ? (
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            {text ? text : 'Nie udało się pobrać danych!'}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
            {text ? text : 'Dane odświeżone prawidłowo!'}
          </Alert>
        )}
      </Snackbar>
    </Stack>
  )
}
