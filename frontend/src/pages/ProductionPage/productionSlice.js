import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'
import { binaryToBase64 } from '../../helpers/binaryToBase64';
import { forecastGoal } from '../../helpers/forecastGoal';
import { objectToArrayWithId } from '../../helpers/object';
import { sumValueInObject } from '../../helpers/sumValueInObject';



const initialState = {
    productionUnits: [],
    salesUnits: [],
    totalSales: [],
    productionOrders: [],
    salesOrders: [],
    forecast: {},
    lastScans: [],
    goal: 950,
    month: 'all',
    status: 'idle',
    error: null
}

export const fetchData = createAsyncThunk('production/fetchData', async () => {
    const productionRes = await axios.get('/productionUnits');
    const salesRes = await axios.get('/salesUnits');
    const totalSalesVatRes = await axios.get('/salesVat');
    const totalSalesWithoutVat = await axios.get('/salesWithoutVat');
    const productionOrders = await axios.get('/productionOrders');
    const salesOrders = await axios.get('/salesOrders');
    const lastScans = await axios.get('/lastScans');
    const newlastScans = binaryToBase64(lastScans.data);
    const newProductionUnits = objectToArrayWithId(productionRes.data);
    const newSalesUnits = objectToArrayWithId(salesRes.data);
    const newOrders = objectToArrayWithId(productionOrders.data);
    const newSalesOrders = objectToArrayWithId(salesOrders.data);
    const newTotalSales = sumValueInObject(totalSalesVatRes.data) + sumValueInObject(totalSalesWithoutVat.data);
    const newForecast = forecastGoal(newProductionUnits[(newProductionUnits.length) - 1].units, initialState.goal);

    const response = {
        productionUnits: newProductionUnits,
        salesUnits: newSalesUnits,
        totalSales: newTotalSales.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }),
        productionOrders: newOrders,
        salesOrders: newSalesOrders,
        forecast: newForecast,
        lastScans: newlastScans
    }
    return response
})

export const productionSlice = createSlice({
    name: 'production',
    initialState,
    reducers: {
        goalUpdated(state, action) {
            state.goal = action.payload;
        },
        monthUpdated(state, action) {
            state.month = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchData.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.productionUnits = action.payload.productionUnits
                state.salesUnits = action.payload.salesUnits
                state.productionOrders = action.payload.productionOrders
                state.salesOrders = action.payload.salesOrders
                state.forecast = action.payload.forecast
                state.totalSales = action.payload.totalSales
                state.lastScans = action.payload.lastScans
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { goalUpdated, monthUpdated } = productionSlice.actions;

export default productionSlice.reducer

export const selectAllProductionUnits = state => state.production.productionUnits;

export const selectAllSalesUnits = state => state.production.salesUnits
export const selectAllProductionOrders = state => state.production.productionOrders
export const selectAllSalesOrders = state => state.production.salesOrders
export const selectForecast = state => state.production.forecast
export const selectTotalSales = state => state.production.totalSales
export const selectLastScans = state => state.production.lastScans