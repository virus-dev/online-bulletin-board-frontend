import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import inputsReducer from './inputs/inputsSlice';
import messagesReducer from './messages/messagesSlice';
import categoriesReducer from './categories/categoriesSlice';
import brandsReducer from './brands/brandsSlice';
import advertisementReducer from './advertisement/advertisementSlice';
import advertisementsReducer from './advertisements/advertisementsSlice';
import { AsyncReducersInRootState } from './types';

const staticReducers = {
  user: userReducer,
  inputs: inputsReducer,
  messages: messagesReducer,
  categories: categoriesReducer,
  brands: brandsReducer,
  advertisement: advertisementReducer,
  advertisements: advertisementsReducer,
  // [UserAPI.reducerPath]: UserAPI.reducer,
  // [AdvertisementAPI.reducerPath]: AdvertisementAPI.reducer,
  // [CategoriesAPI.reducerPath]: CategoriesAPI.reducer,
  // [BrandsAPI.reducerPath]: BrandsAPI.reducer,
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
    // UserAPI.middleware,
    // AdvertisementAPI.middleware,
    // CategoriesAPI.middleware,
    // BrandsAPI.middleware,
  ]),
});

const store = setupStore();

export const injectReducer = (key: string, asyncReducer: Reducer) => {
  if (!asyncReducers[key]) {
    asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(asyncReducers));
  }
};

export type RootState = ReturnType<typeof rootReducer> & AsyncReducersInRootState;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default store;
