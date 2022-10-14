import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Alert } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import axios from '../../../axios'
import useAuth from '../../../hooks/useAuth'

export default function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState()
  const [auth, setAuth] = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    try {
      const res = await fetchData({
        email: data.get('email'),
        password: data.get('password'),
      })
      setAuth({
        userId: res.data.idUser,
        token: res.data.token,
        role: res.data.isrole,
        email: res.data.email,
      })
      navigate({
        pathname: '/',
      })
    } catch (ex) {
      setError(ex.response.data)
      console.log(ex.response.data)
    }
  }

  const fetchData = async (credentials) => {
    const response = await axios.post('/login', credentials)
    return response
  }
  useEffect(() => {
    if (auth) {
      navigate({
        pathname: '/',
      })
    }
  })

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Zaloguj
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            defaultValue=''
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            defaultValue=''
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Zapamiętaj mnie'
          />
          {error ? (
            <Alert variant='filled' severity='error'>
              {error}
            </Alert>
          ) : null}
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Zaloguj
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Nie pamiętasz hasła?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
