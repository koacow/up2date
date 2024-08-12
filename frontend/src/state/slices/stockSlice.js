import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserSavedStocks, updateUserSavedStocks, deleteUserSavedStocks } from '../../api/accountAPI';
import { searchStocksByQuery, getStockQuoteBySymbol, getStockDailyDataBySymbol, getStockWeeklyDataBySymbol, getStockMonthlyDataBySymbol } from '../../api/stocksAPI';

const initialState = {
    search: {
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
        loading: false,
        error: null,
    },
    overview: {
        "Americas": [
            "INDU:IND",
            "SPX:IND",
            "CCMP:IND",
            "NYA:IND",
            "SPTSX:IND"
        ],
        "Europe, Middle East, & Africa": [
            "SX5E:IND",
            "UKX:IND",
            "DAX:IND",
            "CAC:IND",
            "IBEX:IND"
        ],
        "Asia Pacific": [
            "NKY:IND",
            "HSI:IND",
            "TPX:IND",
            "SHSZ300:IND",
            "AS51:IND",
            "MXAP:IND"
        ]
    }
    
};

// Async thunks
export const fetchStocksByQuery = createAsyncThunk(
    'stocks/fetchStocksByQuery',
    async (_, thunkAPI) => {
        try {
            const query = thunkAPI.getState().stocks.search.query;
            const response = await searchStocksByQuery(query);
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
            const userId = thunkAPI.getState().session.data.id;
            const data = await getUserSavedStocks(userId);
            return data.stock_tickers;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const fetchSavedStocksData = createAsyncThunk(
    'stocks/fetchSavedStocksData',
    async (_, thunkAPI) => {
        try{
            const savedStocks = thunkAPI.getState().stocks.saved.stocks;
            const stockData = savedStocks.map(async (stock) => {
                const quote = await getStockQuoteBySymbol(stock);
                const dailyData = await getStockDailyDataBySymbol(stock);
                const weeklyData = await getStockWeeklyDataBySymbol(stock);
                const monthlyData = await getStockMonthlyDataBySymbol(stock);
                return {
                    symbol: stock,
                    name: quote['01. symbol'],  
                    quote: quote['05. price'],
                    dailyData: dailyData,
                    weeklyData: weeklyData,
                    monthlyData: monthlyData,
                };
            });
            return stockData;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
)

export const updateUserSavedStocksThunk = createAsyncThunk(
    'stocks/updateUserSavedStocks',
    async (stockTickers, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.id;
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
            const userId = thunkAPI.getState().session.data.id;
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
    extraReducers: (builder) => {
        builder.addCase(fetchStocksByQuery.fulfilled, (state, action) => {
            state.search.stocks = action.payload;
            state.search.searchLoading = false;
            state.search.searchError = null;
        });

        builder.addCase(fetchStocksByQuery.pending, (state) => {
            state.search.searchLoading = true;
            state.search.searchError = null;
        });

        builder.addCase(fetchStocksByQuery.rejected, (state, action) => {
            state.search.searchError = action.payload.error;
            state.search.searchLoading = false;
        });

        builder.addCase(fetchUserSavedStocks.fulfilled, (state, action) => {
            state.saved.stocks = action.payload;
            state.saved.loading = false;
            state.saved.error = null;
        });

        builder.addCase(fetchUserSavedStocks.pending, (state) => {
            state.saved.loading = true;
            state.saved.error = null;
        });

        builder.addCase(fetchUserSavedStocks.rejected, (state, action) => {
            state.saved.error = action.payload.error;
            state.saved.loading = false;
        });

        builder.addCase(updateUserSavedStocksThunk.fulfilled, (state, action) => {
            state.saved.stocks = action.payload.stock_tickers;
            state.saved.loading = false;
            state.saved.error = null;
        });

        builder.addCase(updateUserSavedStocksThunk.pending, (state) => {
            state.saved.loading = true;
            state.saved.error = null;
        });

        builder.addCase(updateUserSavedStocksThunk.rejected, (state, action) => {
            state.saved.error = action.payload.error;
            state.saved.loading = false;
        });
    }
});

const { actions, reducer } = stocksSlice;
export const { setQuery, setStocks, setError } = actions;
export default reducer;

