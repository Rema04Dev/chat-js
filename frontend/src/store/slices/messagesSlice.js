/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';
import fetchData from './fetchData';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
        state.loadingStatus = 'succeed';
        state.error = null;
      })
      .addCase(removeChannel, (state, action) => {
        const channelId = action.payload;
        const restMessages = state.messages.filter((message) => message.channelId !== channelId);
        state.messages = restMessages;
      });
  },
});

export default messagesSlice.reducer;
export const { actions } = messagesSlice;
