import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

const initialState = {
    transportOrders: [],
    transports: [],
    status: 'idle',
    error: null
}

export const fetchTransports = createAsyncThunk('transports/fetchTransports', async () => {
    const response = await axios.get('/showTransports');
    const responseWithId = response.data;
    return responseWithId
})


export const transportSlice = createSlice({
    name: 'transports',
    initialState,
    reducers: {
        changeTransportOrders: (state, action) => { state.transportOrders = action.payload },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTransports.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTransports.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.transports = action.payload
            })
            .addCase(fetchTransports.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { changeTransportOrders } = transportSlice.actions;

export default transportSlice.reducer

export const selectAllTransportOrders = state => state.transports.transportOrders
export const selectAllTransports = state => state.transports.transports