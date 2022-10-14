import { useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

import RefreshIcon from '@mui/icons-material/Refresh'
import SearchIcon from '@mui/icons-material/Search'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'

function Searchbar(props) {
  const navigate = useNavigate()
  const [term, setTerm] = useState('')

  const search = () => {
    if (term === '') {
      navigate({
        pathname: '/Zamowienia',
      })
    } else {
      navigate({
        pathname: '/wyszukaj',
        search: createSearchParams({
          id: term,
        }).toString(),
      })
    }
  }
  const onKeyDownHandler = (e) => {
    if (e.key === 'Enter') {
      search()
    }
  }

  const reload = () => {
    props.reload()
  }

  return (
    <AppBar
      position='static'
      color='default'
      elevation={0}
      sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
    >
      <Toolbar>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <SearchIcon color='inherit' sx={{ display: 'block' }} />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              placeholder='Wyszukaj zamówienie'
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: 'default' },
              }}
              variant='standard'
              onKeyDown={onKeyDownHandler}
              onChange={(e) => setTerm(e.target.value)}
              value={term}
            />
          </Grid>
          <Grid item>
            <Button onClick={search} variant='contained' sx={{ mr: 1 }}>
              Szukaj
            </Button>
            <Tooltip title='Reload'>
              <IconButton onClick={reload}>
                <RefreshIcon color='inherit' sx={{ display: 'block' }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
export default Searchbar
