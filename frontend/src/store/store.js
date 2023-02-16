import { configureStore } from '@reduxjs/toolkit';
import channels from './slices/channelsSlice';
import messages from './slices/messagesSlice';
import modals from './slices/modalsSlice';
const store = configureStore({
    reducer: {
        channels,
        messages,
        modals
    }
});

export default store;
