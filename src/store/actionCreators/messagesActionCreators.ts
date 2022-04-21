import { SetStateAction } from 'react';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCountUnreadMessages = createAsyncThunk(
  'messages/getCountUnreadMessages',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}messages/getCountUnreadMessages`, {
        headers: { authorization: `Bearer ${localStorage.getItem('JWT')}` },
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка');
    }
  },
);

export const getDialogs = createAsyncThunk(
  'messages/getDialogs',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}messages/getDialogs`, {
        headers: { authorization: `Bearer ${localStorage.getItem('JWT')}` },
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка');
    }
  },
);

export const getChat = createAsyncThunk(
  'messages/getChat',
  async (id: SetStateAction<number | null>, thunkAPI) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}messages/getChat`, {
        headers: { authorization: `Bearer ${localStorage.getItem('JWT')}` },
        params: {
          idInterlocutor: id,
        },
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка');
    }
  },
);
