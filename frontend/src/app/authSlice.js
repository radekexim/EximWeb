import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(window.localStorage.getItem('token-data')) ?? null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => { state.user = action.payload },
        logout: (state) => { state.user = null }
    },
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = state => state.auth.user;