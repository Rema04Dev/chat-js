import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
}

const messages = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        messagesFetched: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    }
})

export default messages.reducer;
export const { messagesFetched, addMessage } = messages.actions;