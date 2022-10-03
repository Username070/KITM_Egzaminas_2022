import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import initialState from './features/authSlice'
import authService from './features/authService'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  }
})

export const logout = createAsyncThunk('auth/logout',
async () => {
  await authService.logout();
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
})