import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../axios'
import { objectToArrayWithId } from '../../helpers/objectOrders'

const initialState = {
  orders: [],
  complaints: [],
  status: 'idle',
  error: null,
}

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await axios.get('/orders')
  const responseWithId = objectToArrayWithId(response.data)
  return responseWithId
})

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.orders = action.payload.orders
        state.complaints = action.payload.complaints
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default orderSlice.reducer

export const selectAllOrders = (state) => state.orders.orders
export const selectAllComplaints = (state) => state.orders.complaints
