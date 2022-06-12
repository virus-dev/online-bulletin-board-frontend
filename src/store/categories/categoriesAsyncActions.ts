/* eslint import/prefer-default-export: ["off"] */

import { createAsyncThunk } from '@reduxjs/toolkit';
import requestGetCategories from 'Packages/api/rest/categories/requestGetCategories';

export const fetchCategories = createAsyncThunk(
  'categories/getCategories',
  async (_: void, thunkAPI) => {
    try {
      const { data } = await requestGetCategories();
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка');
    }
  },
);
