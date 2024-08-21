import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserWatchList, addStockToWatchList, removeStockFromWatchList, deleteUserWatchList } from '../../api/accountAPI';

const initialState = {
    watchList: {
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
            "Americas": ["^DJI", "^SPX", "^IXIC", "^NYA", "^GSPTSE"],
            // "Europe, Middle East, & Africa": ["SX5E", "UKX", "DAX", "CAC", "IBEX"],
            // "Asia Pacific": ["NKY", "HSI", "TPX", "SHSZ300", "AS51", "MXAP"]
        },
    }
};

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

export const addStockToUserWatchListThunk = createAsyncThunk(
    'stocks/addStockToUserWatchList',
    async (ticker, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.id;
            await addStockToWatchList(userId, ticker);
            return ticker;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const removeStockFromUserWatchListThunk = createAsyncThunk(
    'stocks/removeStockFromUserWatchList',
    async (ticker, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.id;
            await removeStockFromWatchList(userId, ticker);
            return ticker;
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

// Slice
const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        setStocks(state, action) {
            state.search.stocks = action.payload;
        },
        setError(state, action) {
            state.search.searchError = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserWatchList.pending, (state) => {
            state.watchList.loading = true;
            state.watchList.error = null;
        });
        builder.addCase(fetchUserWatchList.fulfilled, (state, action) => {
            state.watchList.stocks = action.payload.map(data => {
                return data.stock_ticker;
            });
            state.watchList.loading = false;
        });
        builder.addCase(fetchUserWatchList.rejected, (state, action) => {
            state.watchList.loading = false;
            state.watchList.error = action.payload.error;
        });

        builder.addCase(addStockToUserWatchListThunk.pending, (state) => {
            state.watchList.loading = true;
            state.watchList.error = null;
        });
        builder.addCase(addStockToUserWatchListThunk.fulfilled, (state, action) => {
            state.watchList.loading = false;
        });
        builder.addCase(addStockToUserWatchListThunk.rejected, (state, action) => {
            state.watchList.loading = false;
            state.watchList.error = action.payload.error;
        });
    }
});

const { actions, reducer } = stocksSlice;
export const { setQuery, setStocks, setError } = actions;
export default reducer;

