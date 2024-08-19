import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserWatchList, updateUserWatchList, deleteUserWatchList } from '../../api/accountAPI';
import { searchStocksByQuery, getStockQuoteByTicker, getStockChartByTicker } from '../../api/stocksAPI';

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
         *      ticker: 'AAPL',
         *      data: {}
         * }]
         */
        loading: false,
        error: null,
    },
    overview: {
        regions: {
            "Americas": [
                {
                    ticker: "INDU",
                    data: {}
                },
                {
                    ticker: "SPX",
                    data: {}
                },
                {
                    ticker: "CCMP",
                    data: {}
                },
                {
                    ticker: "NYA",
                    data: {}
                },
                {
                    ticker: "SPTSX",
                    data: {}
                },
            ],
            // "Europe, Middle East, & Africa": {
            //     "SX5E": {},
            //     "UKX": {},
            //     "DAX": {},
            //     "CAC": {},
            //     "IBEX": {}
            // },
            // "Asia Pacific": {
            //     "NKY": {},
            //     "HSI": {},
            //     "TPX": {},
            //     "SHSZ300": {},
            //     "AS51": {},
            //     "MXAP": {}
            // }
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

export const fetchUserWatchList = createAsyncThunk(
    'stocks/fetchUserWatchList',
    async (_, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.id;
            const data = await getUserWatchList(userId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const fetchQuotesForWatchList = createAsyncThunk(
    'stocks/fetchQuotesForWatchList',
    async (_, thunkAPI) => {
        try{
            const watchList = thunkAPI.getState().stocks.saved.stocks;
            const stockData = await Promise.all(watchList.map(async (stock) => {
                return {
                    ticker: stock.ticker,
                    data: await getStockQuoteByTicker(stock.ticker)
                }
            }));
            return stockData;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
)

export const updateUserWatchListThunk = createAsyncThunk(
    'stocks/updateUserWatchList',
    async (tickers, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.id;
            const data = await updateUserWatchList(userId, tickers);
            return data.stock_tickers;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const deleteUserWatchListThunk = createAsyncThunk(
    'stocks/deleteUserWatchList',
    async (_, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.id;
            await deleteUserWatchList(userId);
            return [];
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const fetchOverviewQuotes = createAsyncThunk(
    'stocks/fetchOverviewQuotes',
    async (_, thunkAPI) => {
        try {
            const regions = thunkAPI.getState().stocks.overview.regions;
            const americasData = await Promise.all(regions['Americas'].map(async (element) => {
                return {
                    ticker: element.ticker,
                    data: await getStockQuoteByTicker(element.ticker)
                };
            }));
            // const emeaData = await Promise.all(Object.keys(regions["Europe, Middle East, & Africa"]).map(async (ticker) => {
            //     return {
            //         ticker: ticker,
            //         data: await getStockQuoteByTicker(ticker)
            //     }
            // }));
            // const apacData = await Promise.all(Object.keys(regions["Asia Pacific"]).map(async (ticker) => {
            //     return {
            //         ticker: ticker,
            //         data: await getStockQuoteByTicker(ticker)
            //     }
            // }));
            return {
                "Americas": americasData,
                // "Europe, Middle East, & Africa": emeaData,
                // "Asia Pacific": apacData,
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
        builder.addCase(fetchStocksByQuery.pending, (state) => {
            state.search.searchLoading = true;
            state.search.searchError = null;
        });
        builder.addCase(fetchStocksByQuery.fulfilled, (state, action) => {
            state.search.stocks = action.payload.quotes;
            state.search.searchLoading = false;
        });
        builder.addCase(fetchStocksByQuery.rejected, (state, action) => {
            state.search.searchLoading = false;
            state.search.searchError = action.payload.error;
        });

        builder.addCase(fetchUserWatchList.pending, (state) => {
            state.saved.loading = true;
            state.saved.error = null;
        });
        builder.addCase(fetchUserWatchList.fulfilled, (state, action) => {
            state.saved.stocks = action.payload.map(data => {
                return {
                    ticker: data.stock_ticker
                }
            });
            state.saved.loading = false;
        });
        builder.addCase(fetchUserWatchList.rejected, (state, action) => {
            state.saved.loading = false;
            state.saved.error = action.payload.error;
        });
        
        builder.addCase(fetchQuotesForWatchList.pending, (state) => {
            state.saved.loading = true;
            state.saved.error = null;
        });
        builder.addCase(fetchQuotesForWatchList.fulfilled, (state, action) => {
            state.saved.stocks = action.payload;
            state.saved.loading = false;
        });
        builder.addCase(fetchQuotesForWatchList.rejected, (state, action) => {
            state.saved.loading = false;
            state.saved.error = action.payload.error;
        });

        builder.addCase(fetchOverviewQuotes.pending, (state) => {
            state.overview.loading = true;
            state.overview.error = null;
        });
        builder.addCase(fetchOverviewQuotes.fulfilled, (state, action) => {
            state.overview.regions = action.payload;
            state.overview.loading = false;
        });
        builder.addCase(fetchOverviewQuotes.rejected, (state, action) => {
            state.overview.loading = false;
            state.overview.error = action.payload.error;
        });

    }
});

const { actions, reducer } = stocksSlice;
export const { setQuery, setStocks, setError } = actions;
export default reducer;

