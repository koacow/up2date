import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login, logout, getUser } from '../../api/authAPI';

const initialState = {
    "data": null,
    "session": null,
    "error": null,
    "loading": false    
};

// Async thunks
export const logUserIn = createAsyncThunk(
    'session/login',
    async (credentials, thunkAPI) => {
        try {
            const response = await login(credentials);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

export const registerUser = createAsyncThunk(
    'session/register',
    async (credentials, thunkAPI) => {
        try {
            const response = await register(credentials);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

export const logUserOut = createAsyncThunk(
    'session/logout',
    async (_, thunkAPI) => {
        try {
            const response = await logout();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

export const fetchUserData = createAsyncThunk(
    'session/getUserData',
    async (_, thunkAPI) => {
        try {
            const response = await getUser();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

// Slice
const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSession(state, action) {
            state.session = action.payload;
        },
        setData(state, action) {
            state.data = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logUserIn.fulfilled, (state, action) => {
            state.session = action.payload;
            state.loading = false;
            state.error = null;
        });

        builder.addCase(logUserIn.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(logUserIn.rejected, (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        });

        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.session = action.payload;
            state.loading = false;
            state.error = null;
        });

        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(registerUser.rejected, (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        });

        builder.addCase(logUserOut.fulfilled, (state) => {
            state.session = null;
            state.loading = false;
            state.error = null;
        });

        builder.addCase(logUserOut.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(logUserOut.rejected, (state, action) => {
            state.session = null;
            state.error = action.payload.error;
            state.loading = false;
        });

        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        });

        builder.addCase(fetchUserData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchUserData.rejected, (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        });
    }
});

const { actions, reducer } = sessionSlice;
export const { setSession, setData, setError } = actions;
export default reducer;

