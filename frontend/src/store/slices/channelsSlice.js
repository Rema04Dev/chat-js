import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    channels: [],
    currentChannelId: null,
}

const channels = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        channelsFethced: (state, action) => {
            state.channels = action.payload;
        }
    }
})

export default channels.reducer;
export const { channelsFethced } = channels.actions;