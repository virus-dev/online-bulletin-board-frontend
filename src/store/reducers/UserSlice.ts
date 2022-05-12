import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'Models/User';
import {
  login, registration, updateData, getData,
} from '../actionCreators/user';

const initialState: User = {
  id: null,
  email: null,
  phone: null,
  role: null,
  firstName: null,
  secondName: null,
  image: null,
  error: null,
};

export const userSlice = createSlice((() => {
  const userDataAdd = (state: User, action: PayloadAction<User>) => {
    state.email = action.payload.email;
    state.phone = action.payload.phone;
    state.role = action.payload.role;
    state.firstName = action.payload.firstName;
    state.secondName = action.payload.secondName;
    state.image = action.payload.image;
    state.error = action.payload.error;
  };

  const userDataError = (state: User, action: PayloadAction<string>) => {
    state.error = action.payload;
  };

  return {
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
      [login.fulfilled.type]: userDataAdd,
      [registration.fulfilled.type]: userDataAdd,
      [updateData.fulfilled.type]: userDataAdd,
      [getData.fulfilled.type]: userDataAdd,
      [login.rejected.type]: userDataError,
      [registration.rejected.type]: userDataError,
      [updateData.rejected.type]: userDataError,
      [getData.rejected.type]: userDataError,
    },
  };
})());

export default userSlice.reducer;
