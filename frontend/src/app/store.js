import { combineReducers, configureStore } from '@reduxjs/toolkit'

import accountsSlice from '../pages/AccountsPage/accountsSlice'
import orderSlice from '../pages/HomeOrders/orderSlice'
import productionSlice from '../pages/ProductionPage/productionSlice'
import transportSlice from '../pages/TransportPage/transportSlice'
import authSlice from './authSlice'

const rootReducer = combineReducers({
  orders: orderSlice,
  production: productionSlice,
  auth: authSlice,
  accounts: accountsSlice,
  transports: transportSlice,
})

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export default configureStore({
  reducer: rootReducer
})
