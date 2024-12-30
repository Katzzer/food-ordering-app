import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Defining the initial state
interface GlobalState {
    message: string;
}

const initialState: GlobalState = {
    message: 'Hello from Redux!',
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setMessage(state, action: PayloadAction<string>) {
            state.message = action.payload; // Update the message
        },
    },
});

export const { setMessage } = globalSlice.actions;

export default globalSlice.reducer;