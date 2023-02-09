import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    channels: [],
    currentChannelId: 1,
}

const channels = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        channelsFethced: (state, action) => {
            state.channels = action.payload;
        },
        setCurrentChannelId: (state, action) => {
            state.currentChannelId = action.payload;
        }
    }
})

export default channels.reducer;
export const { channelsFethced, setCurrentChannelId } = channels.actions;