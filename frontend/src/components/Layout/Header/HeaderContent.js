import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

function HeaderContent({ tabs, children }) {
  return (
    <React.Fragment>
      <AppBar component='div' position='static' elevation={0} sx={{ zIndex: 0 }}>
        <Tabs value={0} textColor='inherit'>
          {tabs.map((tab) => (
            <Tab label={tab.name} key={tab.id} />
          ))}
          {children}
        </Tabs>
      </AppBar>
    </React.Fragment>
  )
}

export default HeaderContent
