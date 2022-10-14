import * as React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import Footer from '../components/Layout/Footer/Footer'
import Header from '../components/Layout/Header/Header'
import Navigator from '../components/Layout/Menu/Navigator'
import AdminRoute from '../hoc/AdminRoute'
import ProtectedRoute from '../hoc/ProtectedRoute'
import NotFound from '../pages/404/404'
import AccountsPage from '../pages/AccountsPage/AccountsPage'
import Login from '../pages/Auth/Login/Login'
import Register from '../pages/Auth/Register/Register'
import Home from '../pages/Home/Home'
import HomeOrders from '../pages/HomeOrders/HomeOrders'
import OrderPage from '../pages/HomeOrders/Order/OrderPage'
import PageCharts from '../pages/ProductionPage/ProductionPage'
import Search from '../pages/Search/Search'
import SettingPage from '../pages/SettingPage/SettingPage'
import NewTransportPage from '../pages/TransportPage/AddTransportPage/NewTransportPage'
import TransportPage from '../pages/TransportPage/TransportPage'
import theme from '../theme'

const drawerWidth = 180

function App() {
  const [navigatorOpen, setNavigatorOpen] = React.useState(false)

  const content = (
    <React.Suspense fallback={<p>Ładowanie...</p>}>
      <Routes>
        <Route path='/Zaloguj' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/Zamowienia' exact element={<HomeOrders />} />
          <Route path='/Zamowienie' element={<OrderPage />} />
          <Route path='/Produkcja' element={<PageCharts />} />
          <Route path='/Transport' element={<TransportPage />} />
          <Route path='/DodajTransport' element={<NewTransportPage />} />
          <Route path='/wyszukaj' element={<Search />} />
          <Route path='/Rejestracja' element={<Register />} />
          <Route path='/Profil' element={<SettingPage />} />
          <Route path='/' exact element={<Home />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path='/Konta' exact element={<AccountsPage />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </React.Suspense>
  )

  const handleDrawerToggle = () => {
    setNavigatorOpen(!navigatorOpen)
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <CssBaseline />
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            variant='temporary'
            open={navigatorOpen}
            onClose={handleDrawerToggle}
          />
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Header onDrawerToggle={handleDrawerToggle} />
            <Box component='main' sx={{ flex: 1, py: 0, px: 0, bgcolor: '#eaeff1' }}>
              {content}
            </Box>
            <Box component='footer' sx={{ p: 2, bgcolor: '#eaeff1' }}>
              <Footer />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  )
}

export default App
