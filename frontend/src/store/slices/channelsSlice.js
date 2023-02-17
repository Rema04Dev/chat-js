import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = {
    channels: [],
    currentChannelId: 1,
    loadingStatus: 'idle', // idle | loading | succeed | failed
    error: null
}

const channels = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setCurrentChannelId: (state, action) => {
            state.currentChannelId = action.payload;
        },
        addChannel: (state, action) => {
            state.channels.push({ ...action.payload, removable: true });
        },
        removeChannel: (state, action) => {
            state.channels.filter((channel) => channel.id !== action.payload)
        },
        renameChannel: (state, action) => {
            const { id, name } = action.payload;
            state.channels = state.channels.map((channel) => {
                return channel.id === id ? ({ ...channel, name: name }) : channel
            })
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loadingStatus = 'loading';
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                const { channels, currentChannelId } = action.payload;

                state.channels = channels;
                state.currentChannelId = currentChannelId;

                state.loadingStatus = 'succeed';
            })
    }
})

export default channels.reducer;
export const {
    setCurrentChannelId,
    addChannel,
    removeChannel,
    renameChannel } = channels.actions;