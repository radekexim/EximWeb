import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import DnsRoundedIcon from '@mui/icons-material/DnsRounded'
import HomeIcon from '@mui/icons-material/Home'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PeopleIcon from '@mui/icons-material/People'
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup'
import ProductionIcon from '@mui/icons-material/PrecisionManufacturing'
import SettingsIcon from '@mui/icons-material/Settings'
import TimerIcon from '@mui/icons-material/Timer'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import useAuth from '../../../hooks/useAuth'

const categories = [
  {
    id: 'Główne',
    children: [
      {
        id: 'Zamówienia',
        name: 'Zamowienia',
        icon: <DnsRoundedIcon />,
        active: false,
      },
      {
        id: 'Produkcja',
        name: 'Produkcja',
        icon: <ProductionIcon />,
        active: false,
      },
      {
        id: 'Transport',
        name: 'Transport',
        icon: <LocalShippingIcon />,
        active: false,
      },
    ],
  },
]

const categoriesAdmin = [
  {
    id: 'Inne',
    children: [
      {
        id: 'Konta',
        name: 'Konta',
        icon: <PeopleIcon />,
        active: false,
      },
      { id: 'Analytics', icon: <SettingsIcon /> },
      { id: 'Performance', icon: <TimerIcon /> },
      { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
    ],
  },
]

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
}

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
}

export default function Navigator(props) {
  const [auth] = useAuth()

  const navigate = useNavigate()
  const { ...other } = props

  function handleClick(buttonName) {
    if (auth) {
      navigate({
        pathname: `/${buttonName}`,
      })
    } else {
      navigate({
        pathname: '/Zaloguj',
      })
    }
    categories.map(({ children }) =>
      children.map(({ name, active }) =>
        // eslint-disable-next-line no-unused-vars
        name === buttonName ? (active = true) : (active = false),
      ),
    )
  }

  return (
    <Drawer {...other}>
      <Box onClick={props.onClose}>
        <List disablePadding>
          <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
            JM EXIM FENETRES
          </ListItem>
          <ListItem sx={{ ...item, ...itemCategory }}>
            <ListItemButton onClick={() => handleClick('')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Strona startowa</ListItemText>
            </ListItemButton>
          </ListItem>
          {auth
            ? categories.map(({ id, children }) => (
                <Box key={id} sx={{ bgcolor: '#101F33' }}>
                  <ListItem sx={{ py: 2, px: 3 }}>
                    <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                  </ListItem>
                  {children.map(({ id: childId, name, icon, active }) => (
                    <ListItem disablePadding key={childId}>
                      <ListItemButton selected={active} sx={item} onClick={() => handleClick(name)}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText>{childId}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}

                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))
            : null}
          {auth && auth.role
            ? categoriesAdmin.map(({ id, children }) => (
                <Box key={id} sx={{ bgcolor: '#101F33' }}>
                  <ListItem sx={{ py: 2, px: 3 }}>
                    <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                  </ListItem>
                  {children.map(({ id: childId, name, icon, active }) => (
                    <ListItem disablePadding key={childId}>
                      <ListItemButton selected={active} sx={item} onClick={() => handleClick(name)}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText>{childId}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}

                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))
            : null}
        </List>
      </Box>
    </Drawer>
  )
}
