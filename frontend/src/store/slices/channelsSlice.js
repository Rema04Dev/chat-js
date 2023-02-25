/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = {
  channels: [],
  currentChannelId: 1,
};

const channelsSlice = createSlice({
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
      if (id === state.currentChannelId) {
        state.currentChannelId = 1;
      }
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      state.channels = state.channels
        .map((channel) => (channel.id === id ? ({ ...channel, name }) : channel));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        state.channels = channels;
        state.currentChannelId = currentChannelId;
      });
  },
});

export default channelsSlice.reducer;
export const {
  setCurrentChannelId,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;
