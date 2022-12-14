import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import axios from '../../../axios'
import useAuth from '../../../hooks/useAuth'
import { changeAccountsStatus } from '../../AccountsPage/accountsSlice'

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [auth] = useAuth()

  const fetchData = async (credentials) => {
    const response = await axios.post('/register', credentials)
    return response
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    try {
      await fetchData({
        email: data.get('email'),
        password: data.get('password'),
        name: data.get('firstName') + ' ' + data.get('lastName'),
      })
      dispatch(changeAccountsStatus('idle'))
      navigate({
        pathname: '/Konta',
      })
    } catch (ex) {
      console.log(ex.response)
    }
  }
  useEffect(() => {
    if (auth && auth.role === false) {
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
          Rejestracja
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='Imi??'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Nazwisko'
                name='lastName'
                autoComplete='family-name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Dodaj
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
