import { combineReducers, configureStore } from '@reduxjs/toolkit';
import UserApi from '../services/UserApi';
import userReducer from './reducers/UserSlice';

const rootReducer = combineReducers({
  user: userReducer,
  [UserApi.reducerPath]: UserApi.reducer,
});

const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(UserApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default setupStore;
