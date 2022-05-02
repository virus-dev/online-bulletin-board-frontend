import { SetStateAction } from 'react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { User } from '../models/User';

interface LoginParams {
  email: string,
  password: string,
}

interface RegistrationParams {
  email: string,
  password: string,
  firstName: string,
}

const UserApi = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}user/` }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    getData: build.query<User, void>({
      query: () => ({
        url: '/getData',
        headers: {
          authorization: `Bearer ${localStorage.getItem('JWT')}`,
        },
      }),
      providesTags: () => ['User'],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (e) {
          // TODO: Что не так?
          // eslint-disable-next-line
          // @ts-ignore: Unreachable code error
          if (e?.error?.status === 401) {
            localStorage.removeItem('JWT');
          }
        }
      },
    }),
    getDataById: build.query<User, number | SetStateAction<number | null>>({
      query: (id) => ({
        url: '/getDataById',
        params: {
          id,
        },
      }),
      providesTags: () => ['User'],
    }),
    update: build.mutation({
      query: (formData) => ({
        url: '/update',
        method: 'POST',
        body: formData,
        headers: {
          authorization: `Bearer ${localStorage.getItem('JWT')}`,
        },
      }),
      invalidatesTags: ['User'],
    }),
    login: build.mutation({
      query: (body: LoginParams) => ({
        url: '/login',
        method: 'POST',
        body,
        headers: {
          authorization: `Bearer ${localStorage.getItem('JWT')}`,
        },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data: { token } } = await queryFulfilled;
          localStorage.setItem('JWT', token);
          window.location.href = '/';
        } catch (e) {
          console.error(e);
        }
      },
    }),
    registration: build.mutation({
      query: (body: RegistrationParams) => ({
        url: '/registration',
        method: 'POST',
        body,
        headers: {
          authorization: `Bearer ${localStorage.getItem('JWT')}`,
        },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data: { token } } = await queryFulfilled;
          localStorage.setItem('JWT', token);
          window.location.href = '/';
        } catch (e) {
          console.error(e);
        }
      },
    }),
  }),
});

export default UserApi;
