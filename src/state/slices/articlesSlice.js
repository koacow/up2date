import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getArticlesByQuery, getArticlesByTopic, getTopHeadlines } from '../../api/articlesAPI';

const initialState = {
    search: {
        query: '',
        articles: [],
        pageNum: 1,
        totalPages: 0,
        loading: false,
        error: null,    
    },
    articlesBySavedTopics: {},
    /**
     * articlesBySavedTopics: {
     *     1: {
     *          name: 'Gaming',
     *        articles: [],
     *      totalPages: 32,
     *      loading: false,
     *    error: null
     */
    topHeadlines: {
        articles: [],
        pageNum: 1,
        totalPages: 0,
        loading: false,
        error: null
    },
};

// Async thunk
export const fetchArticlesByQuery = createAsyncThunk(
    'articles/fetchArticlesByQuery',
    async (_, thunkAPI) => {
        const pageNum = thunkAPI.getState().articles.search.pageNum;
        const query = thunkAPI.getState().articles.search.query;
        try {
            const response = await getArticlesByQuery(query, pageNum);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

export const fetchArticlesForSavedTopic = createAsyncThunk(
    'articles/fetchArticlesForOneSavedTopic',
    async (topicObject, thunkAPI) => {
        const pageNum = topicObject.pageNum;
        const topicId = topicObject.id;
        try {
            const response = await getArticlesByTopic(topicId, pageNum);
            return { topicId, ...response };
        } catch (error) {
            return thunkAPI.rejectWithValue({ topicId, error: error.message });
        }
    });

export const fetchTopHeadlines = createAsyncThunk(
    'articles/fetchTopHeadlines',
    async(_, thunkAPI) => {
        const pageNum = thunkAPI.getState().articles.topHeadlines.pageNum;
        try {
            const response = await getTopHeadlines(pageNum);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);
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
        },
        setArticlesBySavedTopics(state, action) {
            state.articlesBySavedTopics = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchArticlesByQuery.pending, (state) => {
            state.search.loading = true;
            state.search.totalPages = 0;
            state.search.error = null;
        });
        builder.addCase(fetchArticlesByQuery.fulfilled, (state, action) => {
            state.search.articles = action.payload.articles;
            state.search.totalPages = action.payload.totalPages;
            state.search.loading = false;
        });
        builder.addCase(fetchArticlesByQuery.rejected, (state, action) => {
            state.search.articles = [];
            state.search.totalPages = 0;
            state.search.loading = false;
            state.search.error = true;
        });
        builder.addCase(fetchArticlesForSavedTopic.fulfilled, (state, action) => {
            const topicId = action.payload.topicId;
            state.articlesBySavedTopics[topicId] = {
                articles: action.payload.articles,
                totalPages: action.payload.totalPages,
                loading: false,
                error: null
            };
        });
        builder.addCase(fetchArticlesForSavedTopic.pending, (state, action) => {
            const topicId = action.meta.arg.id;
            state.articlesBySavedTopics[topicId] = {
                ...state.articlesBySavedTopics[topicId],
                loading: true,
                error: null
            };
        });
        builder.addCase(fetchArticlesForSavedTopic.rejected, (state, action) => {
            const topicId = action.payload.topicId;
            state.articlesBySavedTopics[topicId] = {
                articles: [],
                totalPages: 0,                
                loading: false,
                error: action.payload.error
            };
        });

        builder.addCase(fetchTopHeadlines.pending, (state) => {
            state.topHeadlines.loading = true;
            state.topHeadlines.totalPages = 0;
            state.topHeadlines.error = null;
        });
        builder.addCase(fetchTopHeadlines.fulfilled, (state, action) => {
            state.topHeadlines.articles = action.payload.articles;
            state.topHeadlines.totalPages = action.payload.totalPages;
            state.topHeadlines.loading = false;
            state.topHeadlines.error = null;
        });
        builder.addCase(fetchTopHeadlines.rejected, (state, action) => {
            state.topHeadlines.articles = [];
            state.topHeadlines.totalPages = 0;
            state.topHeadlines.loading = false;
            state.topHeadlines.error = true;
        });
    }
});

const { actions, reducer } = articlesSlice;
export const { setSearchQuery, setArticlesBySavedTopics, setSearchPageNum } = actions;
export default reducer;
    