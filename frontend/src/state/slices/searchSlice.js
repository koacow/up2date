import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getArticlesByQuery } from '../../api/articlesAPI';

const initialState = {
    query: '',
    articles: [],
    pageNum: 1,
    totalPages: 1,
    searchLoading: false,
    searchError: null,
};

// Async thunk
export const fetchArticlesByQuery = createAsyncThunk(
    'articles/fetchArticlesByQuery',
    async (query, thunkAPI) => {
        const pageNum = thunkAPI.getState().search.pageNum;
        try {
            const response = await getArticlesByQuery(query, pageNum);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

// Slice
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
        },
        setArticles(state, action) {
            state.articles = action.payload;
        },
        setSearchPageNum(state, action) {
            state.pageNum = action.payload;
        },
        setTotalPages(state, action) {
            state.totalPages = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArticlesByQuery.fulfilled, (state, action) => {
            state.articles = action.payload.articles;
            state.totalPages = action.payload.totalResults / 10;
            state.searchLoading = false;
            state.searchError = null;
        });

        builder.addCase(fetchArticlesByQuery.pending, (state) => {
            state.searchLoading = true;
            state.searchError = null;
        });

        builder.addCase(fetchArticlesByQuery.rejected, (state, action) => {
            state.searchError = action.payload.error;
            state.searchLoading = false;
        });
    }
});

const { actions, reducer } = searchSlice;
export const { setQuery, setArticles, setSearchPageNum, setTotalPages, setError } = actions;
export default reducer;
    