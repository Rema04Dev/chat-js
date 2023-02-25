import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  channelId: null,
};

// eslint-disable no-param-reassign
const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, action) => {
      const { modalType, channelId } = action.payload;
      state.modalType = modalType;
      state.channelId = channelId;
    },
    hideModal: (state) => {
      state.modalType = null;
      state.channelId = null;
    },
  },
});

export const { showModal, hideModal } = modalsSlice.actions;
export default modalsSlice.reducer;
