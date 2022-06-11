import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Advertisement } from 'Models/Advertisement';
import { fetchAdvertisement } from './advertisementAsyncActions';
import { InitialStateAdvertisement } from './advertisementTypes';

const initialState: InitialStateAdvertisement = {
  data: {
    advertisementImages: [],
    id: null,
    title: null,
    price: null,
    categoryId: null,
    brandId: null,
    status: null,
    description: null,
    createdAt: null,
    updatedAt: null,
    user: {
      id: null,
      firstName: null,
      email: null,
      image: null,
      phone: null,
      role: null,
      secondName: null,
    },
  },
  isLoading: false,
  error: null,
};

const emptyTheState = (state: InitialStateAdvertisement) => {
  state.data.brandId = null;
  state.data.categoryId = null;
  state.data.createdAt = null;
  state.data.description = null;
  state.data.id = null;
  state.data.price = null;
  state.data.status = null;
  state.data.title = null;
  state.data.updatedAt = null;
  state.data.advertisementImages = [];
  state.data.user = {};
};

export const advertisementSlice = createSlice({
  name: 'advertisement',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAdvertisement.fulfilled.type]: (state, { payload }: PayloadAction<Advertisement>) => {
      state.data = payload;
      state.error = null;
      state.isLoading = false;
    },
    [fetchAdvertisement.pending.type]: (state) => {
      emptyTheState(state);
      state.isLoading = true;
      state.error = null;
    },
    [fetchAdvertisement.rejected.type]: (state) => {
      emptyTheState(state);
      // TODO: Добавить ошибку
      // state.error = null;
      state.isLoading = false;
    },
  },
});

export default advertisementSlice.reducer;
