import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    "data": null,
    "session": null,
    "error": null,    
}

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
    }
});


export const { setSession, setData, setError } = sessionSlice.actions;
export default sessionSlice.reducer;

