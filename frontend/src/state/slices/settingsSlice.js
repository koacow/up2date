import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserSettings, updateUserSettings, resetUserSettings } from '../../api/accountAPI';

const initialState = {
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
    loading: false,
    error: null,
};

// Async reducers
export const fetchSettingsAsync = createAsyncThunk(
    'settings/fetchSettingsAsync',
    async (_, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().session.data.user.id;
            const response = await getSettings(userId);
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
            const userId = thunkAPI.getState().session.data.user.id;
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
            const userId = thunkAPI.getState().session.data.user.id;
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
        setLocalSettings(state, action) {
            state.display = action.payload.display;
            state.notifications = action.payload.notifications;
        },
        setLocalDarkMode(state, action) {
            state.display.darkMode = action.payload;
        },
        setLocalLanguage(state, action) {
            state.display.language = action.payload;
        },
        setLocalEmailNotifications(state, action) {
            state.notifications.email = action.payload;
        },
        setLocalPushNotifications(state, action) {
            state.notifications.push = action.payload;
        },
    },
    // Async reducers assume that the user is already logged in
    extraReducers: {
        [fetchSettingsAsync.fulfilled]: (state, action) => {
            state.display = action.payload.display;
            state.notifications = action.payload.notifications;
            state.loading = false;
            state.error = null;
        },
        [fetchSettingsAsync.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchSettingsAsync.rejected]: (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        },
        [updateSettingsAsync.fulfilled]: (state, action) => {
            state.display = action.payload.display;
            state.notifications = action.payload.notifications;
            state.loading = false;
            state.error = null;
        },
        [updateSettingsAsync.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [updateSettingsAsync.rejected]: (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        },
        [resetSettingsAsync.fulfilled]: (state, action) => {
            state.display = action.payload.display;
            state.notifications = action.payload.notifications;
            state.loading = false;
            state.error = null;
        },
        [resetSettingsAsync.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [resetSettingsAsync.rejected]: (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        },
    }
});

const { actions, reducer } = settingsSlice;
export const { setLocalSettings, setLocalDarkMode, setLocalLanguage, setLocalEmailNotifications, setLocalPushNotifications } = actions;
export default reducer;