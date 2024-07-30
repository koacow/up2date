import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getArticlesByQuery, getAllTopics, getArticlesByTopic } from '../../api/articlesAPI';

const initialState = {
    query: '',
    articles: [],
    pageNum: 1,
    totalPages: 1,
    searchLoading: false,
    searchError: null,
};

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
    extraReducers: {
        [fetchArticlesByQuery.fulfilled]: (state, action) => {
            state.search.articles = action.payload.articles;
            state.search.totalPages = action.payload.total_pages;
            state.search.searchLoading = false;
            state.search.searchError = null;
        },
        [fetchArticlesByQuery.pending]: (state) => {
            state.search.searchLoading = true;
            state.search.searchError = null;
        },
        [fetchArticlesByQuery.rejected]: (state, action) => {
            state.search.searchError = action.payload.error;
            state.search.searchLoading = false;
        },
    }
});

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
export const { setQuery, setArticles, setSearchPageNum, setTotalPages, setError } = searchSlice.actions;
export default articleSlice.reducer;
    