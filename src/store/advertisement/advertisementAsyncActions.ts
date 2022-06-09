/* eslint import/prefer-default-export: ["off"] */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Advertisement } from 'Models/Advertisement';

export const fetchAdvertisement = createAsyncThunk(
  'advertisement/fetchAdvertisement',
  async (advertisementId: number, thunkAPI) => {
    try {
      const { data } = await axios.get<Advertisement>(`${process.env.REACT_APP_API_URL}advertisement/getOne`, {
        params: {
          id: advertisementId,
        },
        headers: {
          authorization: `Bearer ${localStorage.getItem('JWT')}`,
        },
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка');
    }
  },
);
