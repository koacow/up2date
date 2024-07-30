import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getArticlesByQuery, getAllTopics, getArticlesByTopic } from '../../api/articlesAPI';

const initialState = {
    topics: {
        topicsLoading: false,
        topicsError: null
    },
    search: {
        query: '',
        articles: [],
        pageNum: 1,
        totalPages: 1,
        searchLoading: false,
        searchError: null
    },
    error: null        
};

const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setTopics(state, action) {
            state.topics = action.payload;
        },
        setQuery(state, action) {
            state.search.query = action.payload;
        },
        setArticles(state, action) {
            state.search.articles = action.payload;
        },
        setPageNum(state, action) {
            state.search.pageNum = action.payload;
        },
        setTotalPages(state, action) {
            state.search.totalPages = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setPageNumForTopic(state, action) {
            state.topics[action.payload.topic_id].pageNum = action.payload.pageNum;
        }
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
        [fetchAllTopics.fulfilled]: (state, action) => {
            state.topics = action.payload;
            state.topics.topicsLoading = false;
            state.topics.topicsError = null;
        },
        [fetchAllTopics.pending]: (state) => {
            state.topics.topicsLoading = true;
            state.topics.topicsError = null;
        },     
        [fetchAllTopics.rejected]: (state, action) => {
            state.error = action.payload.error;
            state.topics.topicsLoading = false;
        },
        [fetchArticlesForAllTopics.fulfilled]: (state, action) => {
            action.payload.forEach((articles, index) => {
                state.topics[Object.keys(state.topics)[index]].articles = articles;
            });
            state.topics.topicsLoading = false;
            state.topics.topicsError = null;
        },
        [fetchArticlesForAllTopics.pending]: (state) => {
            state.topics.topicsLoading = true;
            state.topics.topicsError = null;
        },
        [fetchArticlesForAllTopics.rejected]: (state, action) => {
            state.topics.topicsError = action.payload.error;
            state.topics.topicsLoading = false;
        }
    }
});

const fetchArticlesByQuery = createAsyncThunk(
    'articles/fetchArticlesByQuery',
    async (query, thunkAPI) => {
        const pageNum = thunkAPI.getState().articles.search.pageNum;
        try {
            const response = await getArticlesByQuery(query, pageNum);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

const fetchAllTopics = createAsyncThunk(
    'articles/fetchAllTopics',
    async (_, thunkAPI) => {
        try {
            const response = await getAllTopics();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

const fetchArticlesForAllTopics = createAsyncThunk(
    'articles/fetchArticlesForAllTopics',
    async (_, thunkAPI) => {
        try {
            const topics = thunkAPI.getState().articles.topics;
            const articles = await Promise.all(Object.keys(topics).map(topic_id => getArticlesByTopic(topic_id, thunkAPI.getState().articles.topics[topic_id].pageNum)));
            return articles;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });


export const { setTopics, setQuery, setArticles, setPageNum, setTotalPages, setError } = articleSlice.actions;
export default articleSlice.reducer;
    