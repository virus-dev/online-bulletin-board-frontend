import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Categories } from 'Models/Categories';
import { InitialStateCategories } from './categoriesTypes';
import { fetchCategories } from './categoriesAsyncActions';

const initialState: InitialStateCategories = {
  data: [],
  isLoading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCategories.fulfilled.type]: (state, { payload }: PayloadAction<Categories[]>) => {
      state.data = payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchCategories.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchCategories.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = payload;
    },
  },
});

export default categoriesSlice.reducer;
