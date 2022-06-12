import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState, InputPayload } from './inputsTypes';

const initialState: InitialState = {
  advertisementSearch: '',
};

export const inputsSlice = createSlice({
  name: 'inputs',
  initialState,
  reducers: {
    setChangeInput(state, { payload: { field, value } }: PayloadAction<InputPayload>) {
      state[field] = value;
    },
  },
  extraReducers: {},
});

export default inputsSlice.reducer;
