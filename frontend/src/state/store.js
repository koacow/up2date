import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import sessionReducer from './slices/sessionSlice';
import topicsReducer from './slices/topicsSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        settings: settingsReducer,
        topics: topicsReducer,
        search: searchReducer
    }
});

