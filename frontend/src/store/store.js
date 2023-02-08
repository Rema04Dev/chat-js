import { configureStore } from '@reduxjs/toolkit';
import channels from './slices/channelsSlice';

const store = configureStore({
    reducer: {
        channels
    }
});

export default store;
