import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'
import { objectToArrayWithId } from '../../helpers/objectOrders';

const initialState = {
    orders: [],
    status: 'idle',
    error: null
}

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const response = await axios.get('/orders');
    const responseWithId = objectToArrayWithId(response.data);
    return responseWithId
})

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchOrders.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.orders = action.payload
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default orderSlice.reducer

export const selectAllOrders = state => state.orders.orders