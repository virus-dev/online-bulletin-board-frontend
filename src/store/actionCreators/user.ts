import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import LoginAndRegistrationData from '../../models/LoginAndRegistrationData';

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: LoginAndRegistrationData, thunkAPI) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });
      localStorage.setItem('JWT', data.token);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Пользователь не найден');
    }
  },
);

export const registration = createAsyncThunk(
  'user/registration',
  async ({ email, password }: LoginAndRegistrationData, thunkAPI) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/user/registration', {
        email,
        password,
      });
      localStorage.setItem('JWT', data.token);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
