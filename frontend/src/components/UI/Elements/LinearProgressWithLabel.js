import * as React from 'react'

import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

export default function LinearProgressWithLabel(props) {
  LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  }
  return (
    <Box sx={{ width: '100%', mr: 1 }}>
      <LinearProgress
        sx={{ height: 20, width: '100%' }}
        color='primary'
        variant='determinate'
        {...props}
      />
      <Typography variant='body2' color='text.secondary'>{`${Math.round(
        props.value,
      )}%`}</Typography>
    </Box>
  )
}
