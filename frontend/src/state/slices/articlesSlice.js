import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getArticlesByQuery, getArticlesByTopic } from '../../api/articlesAPI';

const initialState = {
    search: {
        query: '',
        articles: [],
        pageNum: 1,
        totalPages: 1,
        loading: false,
        error: null,    
    },
    articlesBySavedTopics: {}
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

export const fetchArticlesForSavedTopic = createAsyncThunk(
    'articles/fetchArticlesForOneSavedTopic',
    async (topicId, thunkAPI) => {
        const pageNum = thunkAPI.getState().topics.topics.find(topic => topic.id === topicId).pageNum;
        const response = await getArticlesByTopic(topicId, pageNum);
        return response;
    });
// Slice
const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setSearchQuery(state, action) {
            state.search.query = action.payload;
        },
        setSearchPageNum(state, action) {
            state.search.pageNum = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArticlesByQuery.pending, (state) => {
            state.search.loading = true;
            state.search.error = null;
        });
        builder.addCase(fetchArticlesByQuery.fulfilled, (state, action) => {
            state.search.articles = action.payload.articles;
            state.search.totalPages = int(action.payload.totalResults/10);
            state.search.loading = false;
        });
        builder.addCase(fetchArticlesByQuery.rejected, (state, action) => {
            state.search.loading = false;
            state.search.error = action.payload.error;
        });
        builder.addCase(fetchArticlesForSavedTopic.fulfilled, (state, action) => {
            state.articlesBySavedTopics[action.payload.topic_id] = action.payload.articles;
            state.articlesBySavedTopics[action.payload.topic_id].loading = false;
            state.articlesBySavedTopics[action.payload.topic_id].error = null;
        });
        builder.addCase(fetchArticlesForSavedTopic.pending, (state, action) => {
            state.articlesBySavedTopics[action.payload].loading = true;
            state.articlesBySavedTopics[action.payload].error = null;
        });
        builder.addCase(fetchArticlesForSavedTopic.rejected, (state, action) => {
            state.articlesBySavedTopics[action.payload.topic_id].loading = false;
            state.articlesBySavedTopics[action.payload.topic_id].error = action.payload.error;
        });
    }
});

const { actions, reducer } = articlesSlice;
export const { setQuery, setArticles, setSearchPageNum, setTotalPages, setError } = actions;
export default reducer;
    