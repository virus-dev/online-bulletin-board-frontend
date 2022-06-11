import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import requestLogin, { LoginReqData } from 'Packages/api/rest/user/requestLogin';

export const login = createAsyncThunk(
  'user/login',
  async (loginReqData: LoginReqData, thunkAPI) => {
    try {
      const { data, data: { token } } = await requestLogin(loginReqData);
      localStorage.setItem('JWT', token);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Пользователь не найден');
    }
  },
);

// export const registration = createAsyncThunk(
//   'user/registration',
//   async ({ email, password, firstName }: RegistrationData, thunkAPI) => {
//     try {
//       const { data, data: { token } } =
// await axios.post(`${process.env.REACT_APP_API_URL}user/registration`, {
//         email,
//         password,
//         firstName,
//       });
//       localStorage.setItem('JWT', token);
//       return data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue('error');
//     }
//   },
// );

// export const updateData = createAsyncThunk(
//   'user/updateData',
//   // TODO: Временно any
//   // eslint-disable-next-line
//   // @ts-ignore: Unreachable code error
//   async (formData, thunkAPI) => {
//     try {
//       const { data, data: { token } } =
// await axios.post(`${process.env.REACT_APP_API_URL}user/update`, formData, {
//         headers: { authorization: `Baber ${localStorage.getItem('JWT')}` },
//       });
//       localStorage.setItem('JWT', token);
//       return data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue('error');
//     }
//   },
// );

export const getData = createAsyncThunk(
  'user/getData',
  async (token: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}user/getData`, {
        headers: { authorization: `Baber ${token}` },
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
