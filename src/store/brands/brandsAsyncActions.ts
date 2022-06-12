/* eslint import/prefer-default-export: ["off"] */

import { createAsyncThunk } from '@reduxjs/toolkit';
import requestGetBrands, { BrandsReqData } from 'Packages/api/rest/brands/requestGetBrands';

export const fetchBrands = createAsyncThunk(
  'brands/getBrands',
  async (reqData: BrandsReqData, thunkAPI) => {
    try {
      const { data } = await requestGetBrands(reqData);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка');
    }
  },
);
