import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import sessionReducer from './slices/sessionSlice';
import topicsReducer from './slices/topicsSlice';
import articlesReducer from './slices/articlesSlice';
import stocksReducer from './slices/stockSlice';

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        settings: settingsReducer,
        topics: topicsReducer,
        articles: articlesReducer,
        stocks: stocksReducer
    },
});

