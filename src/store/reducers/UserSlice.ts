import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, registration } from '../actionCreators/user';

export interface User {
  email: string | null,
  phone: string | null,
  role: string | null,
  firstName: string | null,
  secondName: string | null,
  error: string | null,
}

const initialState: User = {
  email: null,
  phone: null,
  role: null,
  firstName: null,
  secondName: null,
  error: null,
};

export const userSlice = createSlice((() => {
  const userDataAdd = (state: any, action: PayloadAction<User>) => {
    state.email = action.payload.email;
    state.phone = action.payload.phone;
    state.role = action.payload.role;
    state.firstName = action.payload.firstName;
    state.secondName = action.payload.secondName;
    state.error = action.payload.error;
  };

  const userDataError = (state: any, action: PayloadAction<string>) => {
    state.error = action.payload;
  };

  return {
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
      [login.fulfilled.type]: userDataAdd,
      [registration.fulfilled.type]: userDataAdd,
      [login.rejected.type]: userDataError,
      [registration.rejected.type]: userDataError,
    },
  };
})());

export default userSlice.reducer;
