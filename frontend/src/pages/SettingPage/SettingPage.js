import { useState } from 'react'

import ProfileIcon from '@mui/icons-material/AccountBox'
import SettingsIcon from '@mui/icons-material/Settings'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import OtherPage from './Other/OtherPage'
import ProfilePage from './Profile/ProfilePage'

export default function SettingPage() {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <>
      <Tabs value={value} onChange={handleChange} aria-label='icon position tabs example'>
        <Tab icon={<ProfileIcon />} label='Profil' />
        <Tab icon={<SettingsIcon />} label='Inne' />
      </Tabs>
      {value === 0 ? <ProfilePage /> : <OtherPage />}
    </>
  )
}
