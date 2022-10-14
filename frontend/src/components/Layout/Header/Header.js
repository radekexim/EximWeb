import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import Logout from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import PropTypes from 'prop-types'

import useAuth from '../../../hooks/useAuth'

function Header({ onDrawerToggle }) {
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()
  const [profileMenu, setProfileMenu] = useState(null)

  const logout = () => {
    setProfileMenu(null)
    setAuth(false)
    navigate({
      pathname: '/Zaloguj',
    })
  }

  return (
    <>
      <AppBar
        color='primary'
        position='sticky'
        elevation={0}
        sx={{ boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)' }}
      >
        <Toolbar>
          <Grid container spacing={1} alignItems='center'>
            <Grid sx={{ display: 'block' }} item>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={onDrawerToggle}
                edge='start'
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            {auth ? (
              <Grid item>
                <IconButton
                  aria-controls='profile-menu'
                  onClick={(e) => setProfileMenu(e.currentTarget)}
                  color='inherit'
                  sx={{ p: 0.5 }}
                >
                  <Avatar src='/static/images/avatar/1.jpg' alt='My Avatar' />
                </IconButton>
                <Menu
                  id='profile-menu'
                  open={Boolean(profileMenu)}
                  anchorEl={profileMenu}
                  onClose={() => setProfileMenu(null)}
                  disableAutoFocusItem
                >
                  {auth.role ? (
                    <MenuItem>
                      <ListItemIcon>
                        <PersonAdd fontSize='small' />
                      </ListItemIcon>
                      Dodaj konto
                    </MenuItem>
                  ) : null}
                  <MenuItem
                    component={RouterLink}
                    onClick={() => setProfileMenu(null)}
                    to='/Profil'
                  >
                    <ListItemIcon>
                      <Settings fontSize='small' />
                    </ListItemIcon>
                    Ustawienia
                  </MenuItem>
                  <MenuItem component={RouterLink} onClick={logout} to='/Zaloguj'>
                    <ListItemIcon>
                      <Logout fontSize='small' />
                    </ListItemIcon>
                    Wyloguj
                  </MenuItem>
                </Menu>
              </Grid>
            ) : null}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
}

export default Header
