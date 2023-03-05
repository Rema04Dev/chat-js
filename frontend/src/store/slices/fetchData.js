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
      console.log(err);
      return rejectWithValue({ status: err.response.status });
    }
  },
);

export default fetchData;
