import { removeChannel } from './channelsSlice';
import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = {
    messages: [],
}

const messages = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                state.messages = action.payload.messages;
            })
            .addCase(removeChannel, (state, action) => {
                const channelId = action.payload;
                const restMessages = state.messages.filter((message) => message.channelId !== channelId);
                state.messages = restMessages;
            })
    }
})

export default messages.reducer;
export const { messagesFetched, addMessage } = messages.actions;