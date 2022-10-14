import { configureStore } from '@reduxjs/toolkit'

import accountsSlice from '../pages/AccountsPage/accountsSlice'
import orderSlice from '../pages/HomeOrders/orderSlice'
import productionSlice from '../pages/ProductionPage/productionSlice'
import transportSlice from '../pages/TransportPage/transportSlice'
import authSlice from './authSlice'

export default configureStore({
  reducer: {
    orders: orderSlice,
    production: productionSlice,
    auth: authSlice,
    accounts: accountsSlice,
    transports: transportSlice,
  },
})
