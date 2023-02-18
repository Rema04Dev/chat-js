import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = {
    channels: [],
    currentChannelId: 1,
}

const channels = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setCurrentChannelId: (state, action) => {
            state.currentChannelId = action.payload;
        },
        addChannel: (state, action) => {
            const channel = action.payload;
            state.channels.push(channel);
        },
        removeChannel: (state, action) => {
            const { id } = action.payload;
            state.channels = state.channels.filter((channel) => channel.id !== id);
            state.currentChannelId = 1;
        },
        renameChannel: (state, action) => {
            const { id, name } = action.payload;
            state.channels = state.channels.map((channel) => {
                return channel.id === id ? ({ ...channel, name: name }) : channel
            });
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                const { channels, currentChannelId } = action.payload;
                state.channels = channels;
                state.currentChannelId = currentChannelId;
            })
    }
})

export default channels.reducer;
export const {
    setCurrentChannelId,
    addChannel,
    removeChannel,
    renameChannel } = channels.actions;