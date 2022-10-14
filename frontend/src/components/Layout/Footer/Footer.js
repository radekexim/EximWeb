import Typography from '@mui/material/Typography'

const Footer = () => (
  <Typography variant='body2' color='text.secondary' align='center'>
    {'Copyright © '}
    {new Date().getFullYear()}.
  </Typography>
)

export default Footer
