import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'Models/User';
import {
  login, registration, updateData, getData,
} from '../actionCreators/user';
import { InitialStateUser } from './userTypes';

const initialState: InitialStateUser = {
  data: {
    id: null,
    email: null,
    phone: null,
    role: null,
    firstName: null,
    secondName: null,
    image: null,
  },
  isLoading: true,
  error: null,
};

export const userSlice = createSlice((() => {
  const userDataAdd = (state: InitialStateUser, action: PayloadAction<User>) => {
    state.data.id = action.payload.id;
    state.data.email = action.payload.email;
    state.data.phone = action.payload.phone;
    state.data.role = action.payload.role;
    state.data.firstName = action.payload.firstName;
    state.data.secondName = action.payload.secondName;
    state.data.image = action.payload.image;
    state.isLoading = false;
    state.error = null;
  };

  const userDataPending = (state: InitialStateUser) => {
    state.isLoading = true;
    state.error = null;
  };

  const userDataError = (state: InitialStateUser, action: PayloadAction<string>) => {
    state.error = action.payload;
    state.isLoading = false;
  };

  return {
    name: 'user',
    initialState,
    reducers: {
      setUserData: userDataAdd,
    },
    extraReducers: {
      [login.fulfilled.type]: userDataAdd,
      [registration.fulfilled.type]: userDataAdd,
      [updateData.fulfilled.type]: userDataAdd,
      [getData.fulfilled.type]: userDataAdd,
      [login.pending.type]: userDataPending,
      [registration.pending.type]: userDataPending,
      [updateData.pending.type]: userDataPending,
      [getData.pending.type]: userDataPending,
      [login.rejected.type]: userDataError,
      [registration.rejected.type]: userDataError,
      [updateData.rejected.type]: userDataError,
      [getData.rejected.type]: userDataError,
    },
  };
})());

export default userSlice.reducer;
