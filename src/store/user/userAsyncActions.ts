import { createAsyncThunk } from '@reduxjs/toolkit';
import requestLogin, { LoginReqData } from 'Packages/api/rest/user/requestLogin';
import requestRegistration, { RegistrationReqData } from 'Packages/api/rest/user/requestRegistration';
import requestUpdate, { UpdateReqData } from 'Packages/api/rest/user/requestUpdate';
import requestGetData from 'Packages/api/rest/user/requestGetData';
import { UserResponseData } from 'Packages/api/rest/user/types';

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

export const registration = createAsyncThunk(
  'user/registration',
  async (registrationReqData: RegistrationReqData, thunkAPI) => {
    try {
      const { data, data: { token } } = await requestRegistration(registrationReqData);
      localStorage.setItem('JWT', token);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);

export const updateData = createAsyncThunk(
  'user/updateData',
  async (formData: UpdateReqData, thunkAPI) => {
    try {
      const { data, data: { token } } = await requestUpdate(formData);
      localStorage.setItem('JWT', token);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);

export const getData = createAsyncThunk(
  'user/getData',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('JWT');

    if (!token) {
      return {
        token: '',
        email: null,
        firstName: null,
        id: null,
        image: null,
        phone: null,
        role: null,
        secondName: null,
      } as UserResponseData;
    }

    try {
      const { data } = await requestGetData();
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
