import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { login, registration } from '../actionCreators/user';
import { User } from '../../models/User';

const initialState: User = {
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
    reducers: {
      getUserDataFromJWT: (state: User, payload: PayloadAction<string | null>) => {
        if (!payload || !payload.payload) {
          return;
        }

        const {
          email,
          phone,
          role,
          firstName,
          secondName,
          image,
        } = jwtDecode<User>(payload.payload);

        state.email = email;
        state.phone = phone;
        state.role = role;
        state.firstName = firstName;
        state.secondName = secondName;
        state.image = image;
      },
    },
    extraReducers: {
      [login.fulfilled.type]: userDataAdd,
      [registration.fulfilled.type]: userDataAdd,
      [login.rejected.type]: userDataError,
      [registration.rejected.type]: userDataError,
    },
  };
})());

export default userSlice.reducer;
