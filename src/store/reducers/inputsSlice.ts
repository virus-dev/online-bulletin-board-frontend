import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Field {
  advertisementSearch = 'advertisementSearch',
}

interface InputPayload {
  field: Field,
  value: string,
}

interface Inputs {
  advertisementSearch: string,
}

interface InitialState {
  inputs: Inputs,
}

const initialState: InitialState = {
  inputs: {
    advertisementSearch: '',
  },
};

export const inputsSlice = createSlice({
  name: 'inputs',
  initialState,
  reducers: {
    setChangeInput(state, { payload: { field, value } }: PayloadAction<InputPayload>) {
      state.inputs[field] = value;
    },
  },
  extraReducers: {},
});

export default inputsSlice.reducer;
