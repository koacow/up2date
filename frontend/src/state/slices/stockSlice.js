import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserSavedStocks, updateUserSavedStocks, deleteUserSavedStocks } from '../../api/accountAPI';
import { getStocksByQuery, getStockQuoteBySymbol, getStockDailyDataBySymbol, getStockWeeklyDataBySymbol, getStockMonthlyDataBySymbol } from '../../api/stocksAPI';

const initialState = {
    search:{
        query: '',
        stocks: [],
        searchLoading: false,
        searchError: null,
    },
    saved: {
        stocks: [],
        /**
         * stocks: [{
         *      symbol: 'AAPL',
         *      name: 'Apple Inc.',
         *      quote: 123.45,
         *      dailyData: [],
         *      weeklyData: [],
         *      monthlyData: [],
         * }]
         */
        savedStocksLoading: false,
        savedStocksError: null,
    }
};

// Async thunks
export const fetchStocksByQuery = createAsyncThunk(
    'stocks/fetchStocksByQuery',
    async (query, thunkAPI) => {
        try {
            const response = await getStocksByQuery(query);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// TODO: figure out naming schemes for these thunks
export const fetchUserSavedStocks = createAsyncThunk(
    'stocks/fetchUserSavedStocks',
    async (_, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.user.id;
            const data = await getUserSavedStocks(userId);
            return data.stock_tickers;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const updateUserSavedStocksThunk = createAsyncThunk(
    'stocks/updateUserSavedStocks',
    async (stockTickers, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.user.id;
            const data = await updateUserSavedStocks(userId, stockTickers);
            return data.stock_tickers;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const deleteUserSavedStocksThunk = createAsyncThunk(
    'stocks/deleteUserSavedStocks',
    async (_, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.user.id;
            await deleteUserSavedStocks(userId);
            return [];
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const fetchStockQuoteBySymbol = createAsyncThunk(
    'stocks/fetchStockQuoteBySymbol',
    async (symbol, thunkAPI) => {
        try {
            const data = await getStockQuoteBySymbol(symbol);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const fetchStockDailyDataBySymbol = createAsyncThunk(
    'stocks/fetchStockDailyDataBySymbol',
    async (symbol, thunkAPI) => {
        try {
            const data = await getStockDailyDataBySymbol(symbol);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const fetchStockWeeklyDataBySymbol = createAsyncThunk(
    'stocks/fetchStockWeeklyDataBySymbol',
    async (symbol, thunkAPI) => {
        try {
            const data = await getStockWeeklyDataBySymbol(symbol);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const fetchStockMonthlyDataBySymbol = createAsyncThunk(
    'stocks/fetchStockMonthlyDataBySymbol',
    async (symbol, thunkAPI) => {
        try {
            const data = await getStockMonthlyDataBySymbol(symbol);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);  

// Slice
const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        setQuery(state, action) {
            state.search.query = action.payload;
        },
        setStocks(state, action) {
            state.search.stocks = action.payload;
        },
        setError(state, action) {
            state.search.searchError = action.payload;
        },
    },
    extraReducers: {
        [fetchStocksByQuery.fulfilled]: (state, action) => {
            state.search.stocks = action.payload;
            state.search.searchLoading = false;
            state.search.searchError = null;
        },
        [fetchStocksByQuery.pending]: (state) => {
            state.search.searchLoading = true;
            state.search.searchError = null;
        },
        [fetchStocksByQuery.rejected]: (state, action) => {
            state.search.searchError = action.payload.error;
            state.search.searchLoading = false;
        },
        [fetchUserSavedStocks.fulfilled]: (state, action) => {
            state.saved.stocks = action.payload.map(stock => stock.stock_ticker);
            state.saved.savedStocksLoading = false;
            state.saved.savedStocksError = null;
        },
        [fetchUserSavedStocks.pending]: (state) => {
            state.saved.savedStocksLoading = true;
            state.saved.savedStocksError = null;
        },
        [fetchUserSavedStocks.rejected]: (state, action) => {
            state.saved.savedStocksError = action.payload.error;
            state.saved.savedStocksLoading = false;
        },
        [updateUserSavedStocksThunk.fulfilled]: (state, action) => {
            state.saved.stocks = action.payload.stock_tickers;
            state.saved.savedStocksLoading = false;
            state.saved.savedStocksError = null;
        },
        [updateUserSavedStocksThunk.pending]: (state) => {
            state.saved.savedStocksLoading = true;
            state.saved.savedStocksError = null;
        },
        [updateUserSavedStocksThunk.rejected]: (state, action) => {
            state.saved.savedStocksError = action.payload.error;
            state.saved.savedStocksLoading = false;
        },
    }
});

const { actions, reducer } = stocksSlice;
export const { setQuery, setStocks, setError } = actions;
export default reducer;

