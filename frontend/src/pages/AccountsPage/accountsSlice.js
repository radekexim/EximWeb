import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../axios'

const initialState = {
  accounts: [],
  status: 'idle',
  error: null,
}

export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async () => {
  const response = await axios.get('/accounts')
  return response.data
})

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    changeAccountsStatus: (state, action) => {
      state.status = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.accounts = action.payload
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { changeAccountsStatus } = accountsSlice.actions

export default accountsSlice.reducer

export const selectAllAccounts = (state) => state.accounts.accounts
