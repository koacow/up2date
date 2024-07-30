import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { settingsSlice } from './slices/settingsSlice';
import { sessionSlice } from './slices/sessionSlice';
import { topicsSlice } from './slices/topicsSlice';
import { searchSlice } from './slices/searchSlice';

export const store = configureStore({
    reducer: combineReducers({
        // Reducers go here
    })
})

