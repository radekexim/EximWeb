import * as React from 'react'

import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

function Title({ children }) {
  return (
    <Typography component='h2' variant='h6' color='primary' gutterBottom>
      {children}
    </Typography>
  )
}

Title.propTypes = {
  children: PropTypes.node,
}

export default Title
