import { configureStore } from '@reduxjs/toolkit';
import channels from './slices/channelsSlice';
import messages from './slices/messagesSlice';
const store = configureStore({
    reducer: {
        channels,
        messages
    }
});

export default store;
