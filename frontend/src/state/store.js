import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

export const store = configureStore({
    reducer: combineReducers({
        // Reducers go here
    })
})

