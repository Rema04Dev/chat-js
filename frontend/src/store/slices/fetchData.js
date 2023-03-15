import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../utils/routes';

const fetchData = createAsyncThunk(
  'channels/fetchData',
  async (headers, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.dataPath(), headers);
      const { data } = response;
      return data;
    } catch (err) {
      return rejectWithValue({
        message: err?.message,
        status: err?.response?.status,
        isAxiosError: err?.isAxiosError,
      });
    }
  },
);

export default fetchData;
