import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import UserAPI from 'Services/UserAPI';
import AdvertisementAPI from 'Services/AdvertisementAPI';
import CategoriesAPI from 'Services/CategoriesAPI';
import BrandsAPI from 'Services/BrandsAPI';
import userReducer from './reducers/UserSlice';
import inputsReducer from './reducers/inputsSlice';
import messagesReducer from './messages/messagesSlice';

const staticReducers = {
  user: userReducer,
  inputs: inputsReducer,
  messages: messagesReducer,
  [UserAPI.reducerPath]: UserAPI.reducer,
  [AdvertisementAPI.reducerPath]: AdvertisementAPI.reducer,
  [CategoriesAPI.reducerPath]: CategoriesAPI.reducer,
  [BrandsAPI.reducerPath]: BrandsAPI.reducer,
};

const rootReducer = combineReducers({
  ...staticReducers,
});

interface AsyncReducers {
  [key: string]: Reducer,
}

export const createReducer = (asyncReducers: AsyncReducers) => combineReducers({
  ...staticReducers,
  ...asyncReducers,
});

const asyncReducers: AsyncReducers = {};

const setupStore = () => configureStore({
  reducer: createReducer(asyncReducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    UserAPI.middleware,
    AdvertisementAPI.middleware,
    CategoriesAPI.middleware,
    BrandsAPI.middleware,
  ]),
});

const store = setupStore();

export const injectReducer = (key: string, asyncReducer: Reducer) => {
  if (!asyncReducers[key]) {
    asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(asyncReducers));
  }
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default store;
