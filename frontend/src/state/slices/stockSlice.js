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
        regions: {
            "Americas": {
                "INDU": {},
                "SPX": {},
                "CCMP": {},
                "NYA": {},
                "SPTSX": {},
            },
            "Europe, Middle East, & Africa": {
                "SX5E": {},
                "UKX": {},
                "DAX": {},
                "CAC": {},
                "IBEX": {}
            },
            "Asia Pacific": {
                "NKY": {},
                "HSI": {},
                "TPX": {},
                "SHSZ300": {},
                "AS51": {},
                "MXAP": {}
            }
        },
        loading: false,
        error: null,
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

export const fetchOverviewData = createAsyncThunk(
    'stocks/fetchOverviewData',
    async (_, thunkAPI) => {
        try {
            const regions = thunkAPI.getState().stocks.overview.regions;
            const americasData = await Promise.all(Object.keys(regions["Americas"]).map(async (symbol) => {
                return getStockQuoteBySymbol(symbol);
            }));
            const emeaData = await Promise.all(Object.keys(regions["Europe, Middle East, & Africa"]).map(async (symbol) => {
                return getStockQuoteBySymbol(symbol);
            }));
            const apacData = await Promise.all(Object.keys(regions["Asia Pacific"]).map(async (symbol) => {
                return getStockQuoteBySymbol(symbol);
            }));
            return {
                "Americas": americasData,
                "Europe, Middle East, & Africa": emeaData,
                "Asia Pacific": apacData,
            }
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

        builder.addCase(fetchOverviewData.fulfilled, (state, action) => {
            state.overview.regions = action.payload;
            state.overview.loading = false;
            state.overview.error = null;
        });

        builder.addCase(fetchOverviewData.pending, (state) => {
            state.overview.loading = true;
            state.overview.error = null;
        });

        builder.addCase(fetchOverviewData.rejected, (state, action) => {
            state.overview.error = action.payload.error;
            state.overview.loading = false;
        });
    }
});

const { actions, reducer } = stocksSlice;
export const { setQuery, setStocks, setError } = actions;
export default reducer;

