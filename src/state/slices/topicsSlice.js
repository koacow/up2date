import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserSavedTopics, updateUserSavedTopics, deleteUserSavedTopics } from '../../api/accountAPI';
import { getAllTopics } from '../../api/articlesAPI';

const topHeadlines = {
    topic: 'Top Headlines',
    id: 0,
    pageNum: 1
}
const initialState = {
    topics: [topHeadlines],
    savedTopicsLoading: false,
    savedTopicsError: null,
    updateTopicsError: null,
    updateTopicsLoading: false,
};


// Async thunks
export const initiateInitialTopics = createAsyncThunk(
    'topics/initiateInitialTopics',
    async (_, thunkAPI) => {
        try {
            const response = await getAllTopics();
            return response.slice(0, 5);
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const fetchUserSavedTopics = createAsyncThunk(
    'topics/fetchUserSavedTopics',
    async (_, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.id;
            const response = await getUserSavedTopics(userId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const updateUserSavedTopicsThunk = createAsyncThunk(
    'topics/updateUserSavedTopics',
    async (topicIds, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.id;
            const response = await updateUserSavedTopics(userId, topicIds);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const deleteUserSavedTopicsThunk = createAsyncThunk(
    'topics/deleteUserSavedTopics',
    async (topicIds, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.id;
            const response = await deleteUserSavedTopics(userId, topicIds);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// Slice
const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        setTopics(state, action){
            state.topics = action.payload;
        },
        setPageNumForTopic(state, action){
            const { topicId, pageNum } = action.payload;
            const topicIndex = state.topics.findIndex(topic => topic.id === topicId);
            state.topics[topicIndex].pageNum = pageNum;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(initiateInitialTopics.fulfilled, (state, action) => {
            state.topics = [
                topHeadlines,
                ...action.payload.map(topic => {
                    return {
                        topic: topic.topic,
                        id: topic.id,
                        pageNum: 1
                    };
                })
            ];
            state.savedTopicsLoading = false;
            state.savedTopicsError = null;
        });

        builder.addCase(initiateInitialTopics.pending, (state) => {
            state.savedTopicsLoading = true;
            state.savedTopicsError = null;
        });

        builder.addCase(initiateInitialTopics.rejected, (state, action) => {
            state.savedTopicsError = action.payload.error;
            state.savedTopicsLoading = false;
        });

        builder.addCase(fetchUserSavedTopics.fulfilled, (state, action) => {
            state.topics = [
                topHeadlines,
                ...action.payload.map(topic => { 
                    return {
                        topic: topic.topic,
                        id: topic.id,
                        pageNum: 1
                    }
                })
            ];
            state.savedTopicsLoading = false;
            state.savedTopicsError = null;
        });

        builder.addCase(fetchUserSavedTopics.pending, (state) => {
            state.savedTopicsLoading = true;
            state.savedTopicsError = null;
        });

        builder.addCase(fetchUserSavedTopics.rejected, (state, action) => {
            state.savedTopicsError = action.payload.error;
            state.savedTopicsLoading = false;
        });

        builder.addCase(updateUserSavedTopicsThunk.fulfilled, (state) => {
            state.updateTopicsLoading = false;
            state.updateTopicsError = null;
        });

        builder.addCase(updateUserSavedTopicsThunk.pending, (state) => {
            state.updateTopicsLoading = true;
            state.updateTopicsError = null;
        });

        builder.addCase(updateUserSavedTopicsThunk.rejected, (state, action) => {
            state.updateTopicsError = action.payload.error;
            state.updateTopicsLoading = false;
        });            
    }
});

const { reducer, actions } = topicsSlice;
export const { setTopics, setPageNumForTopic } = actions;
export default reducer;