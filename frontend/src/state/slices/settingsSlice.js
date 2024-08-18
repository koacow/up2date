import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserSettings, updateUserSettings, resetUserSettings } from '../../api/accountAPI';

const initialState = {
    settings: {
        display: {
            darkMode: false,
            language: "en"
        },
        notifications: {
            email: {
                dailyDigest: true,
                newsletter: true
            },
            push: {
                dailyDigest: true,
                newsletter: true
            }
        },
    },
    loading: false,
    error: null,
};

// Async reducers
export const fetchSettingsAsync = createAsyncThunk(
    'settings/fetchSettingsAsync',
    async (_, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.id;
            const response = await getUserSettings(userId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const updateSettingsAsync = createAsyncThunk(
    'settings/updateSettingsAsync',
    async (settings, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.id;
            await updateUserSettings(userId, settings);
            return settings;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const resetSettingsAsync = createAsyncThunk(
    'settings/resetSettingsAsync',
    async (_, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.id;
            await resetUserSettings(userId);
            return initialState;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// Slice
const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        resetToDefaultSettings(state) {
            state.settings = initialState.settings;
        }
    },
    // Async reducers assume that the user is already logged in
    extraReducers: (builder) => {
        builder.addCase(fetchSettingsAsync.fulfilled, (state, action) => {
            state.settings.display = action.payload.display;
            state.settings.notifications = action.payload.notifications;
            state.loading = false;
            state.error = null;
        });

        builder.addCase(fetchSettingsAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchSettingsAsync.rejected, (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        });

        builder.addCase(updateSettingsAsync.fulfilled, (state, action) => {
            state.settings.display = action.payload.display;
            state.settings.notifications = action.payload.notifications;
            state.loading = false;
            state.error = null;
        });

        builder.addCase(updateSettingsAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(updateSettingsAsync.rejected, (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        });

        builder.addCase(resetSettingsAsync.fulfilled, (state, action) => {
            state.settings.display = action.payload.display;
            state.settings.notifications = action.payload.notifications;
            state.loading = false;
            state.error = null;
        });

        builder.addCase(resetSettingsAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(resetSettingsAsync.rejected, (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        });
    }
});

const { actions, reducer } = settingsSlice;
export const { resetToDefaultSettings } = actions;
export default reducer;