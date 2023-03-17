/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const DEFAULT_CHANNEL_ID = 1;

const initialState = {
  channels: [],
  currentChannelId: DEFAULT_CHANNEL_ID,
  loading: false,
  error: null,
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
        state.currentChannelId = DEFAULT_CHANNEL_ID;
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
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        state.channels = channels;
        state.currentChannelId = currentChannelId;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
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
