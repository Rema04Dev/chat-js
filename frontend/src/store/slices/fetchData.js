import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../utils/routes';

const fetchData = createAsyncThunk(
  'channels/fetchData',
  async (headers) => {
    const response = await axios.get(routes.dataPath(), headers);
    const { data } = response;
    return data;
  },
);

export default fetchData;
