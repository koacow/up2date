import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserSavedTopics, updateUserSavedTopics, deleteUserSavedTopics } from '../../api/accountAPI';

const initialState = {
    topics: [
            {
                "id": 1,
                "topic": "AI",
                "pageNum": 1
            },
            {
                "id": 2,
                "topic": "Finance",
                "pageNum": 1
            },
            {
                "id": 3,
                "topic": "Politics",
                "pageNum": 1
            },
            {
                "id": 4,
                "topic": "Economy",
                "pageNum": 1
            },
            {
                "id": 5,
                "topic": "Technology",
                "pageNum": 1
            },
            {
                "id": 6,
                "topic": "Health",
                "pageNum": 1
            },
            {
                "id": 7,
                "topic": "Science",
                "pageNum": 1
            },
            {
                "id": 8,
                "topic": "Sports",
                "pageNum": 1
            },
            {
                "id": 9,
                "topic": "Entertainment",
                "pageNum": 1
            },
            {
                "id": 10,
                "topic": "World",
                "pageNum": 1
            },
            {
                "id": 11,
                "topic": "Business",
                "pageNum": 1
            },
            {
                "id": 12,
                "topic": "Education",
                "pageNum": 1
            },
            {
                "id": 13,
                "topic": "Environment",
                "pageNum": 1
            },
            {
                "id": 14,
                "topic": "Lifestyle",
                "pageNum": 1
            },
            {
                "id": 15,
                "topic": "Opinion",
                "pageNum": 1
            },
            {
                "id": 16,
                "topic": "Travel",
                "pageNum": 1
            },
            {
                "id": 17,
                "topic": "Culture",
                "pageNum": 1
            },
            {
                "id": 18,
                "topic": "Crime",
                "pageNum": 1
            },
            {
                "id": 19,
                "topic": "Weather",
                "pageNum": 1
            },
            {
                "id": 20,
                "topic": "Real Estate",
                "pageNum": 1
            },
            {
                "id": 21,
                "topic": "Fashion",
                "pageNum": 1
            },
            {
                "id": 22,
                "topic": "Food",
                "pageNum": 1
            },
            {
                "id": 23,
                "topic": "Automotive",
                "pageNum": 1
            },
            {
                "id": 24,
                "topic": "History",
                "pageNum": 1
            },
            {
                "id": 25,
                "topic": "Religion",
                "pageNum": 1
            },
            {
                "id": 26,
                "topic": "Art",
                "pageNum": 1
            },
            {
                "id": 27,
                "topic": "Books",
                "pageNum": 1
            },
            {
                "id": 28,
                "topic": "Music",
                "pageNum": 1
            },
            {
                "id": 29,
                "topic": "Movies",
                "pageNum": 1
            },
            {
                "id": 30,
                "topic": "Television",
                "pageNum": 1
            },
            {
                "id": 31,
                "topic": "Theater",
                "pageNum": 1
            },
            {
                "id": 32,
                "topic": "Gaming",
                "pageNum": 1
            },
            {
                "id": 33,
                "topic": "Comics",
                "pageNum": 1
            }
    ],
    savedTopicsLoading: false,
    savedTopicsError: null,
};


// Async thunks
export const fetchUserSavedTopics = createAsyncThunk(
    'topics/fetchUserSavedTopics',
    async (_, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.user.id;
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
            const userId = thunkAPI.getState().session.data.user.id;
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
            const userId = thunkAPI.getState().session.data.user.id;
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
        setTopics(state, action) {
            state.topics = action.payload.map(topic => { 
                return {
                    ...topic,
                    pageNum: 1
                }
        });
        },
        setPageNumForTopic(state, action) {
            state.topics = state.topics.map((topic) => {
                if (topic.id === action.payload.id) {
                    return {
                        ...topic,
                        pageNum: action.payload.pageNum
                    };
                }
                return topic;
            })
        },            
        setError(state, action) {
            state.savedTopicsError = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserSavedTopics.fulfilled, (state, action) => {
            state.topics = action.payload.map(topic => { 
                return {
                    ...topic,
                    pageNum: 1
                }
            });
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
    }
});

const { reducer, actions } = topicsSlice;
export const { setTopics, setPageNumForTopic, setError } = actions;
export default reducer;