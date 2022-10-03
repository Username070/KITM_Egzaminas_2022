import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import transactionService from "./transactionService";

const initialState = {
    transactions: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getTransactions = createAsyncThunk("transactions/get", async (thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await transactionService.getTransactions(token)
    } catch (error) {
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message)
            || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
    }
})

export const createTransaction = createAsyncThunk("transactions/create", async (transactionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await transactionService.createTransaction(transactionData, token)
    } catch (error) {
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message)
            || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
    }
})

export const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTransaction.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.transactions.push(action.payload)
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTransactions.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.transactions = action.payload
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;