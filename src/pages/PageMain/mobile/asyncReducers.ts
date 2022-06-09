import { AsyncReducers } from 'Models/AsyncReducers';
import advertisementsReducer from 'Store/advertisements/advertisementsSlice';

const asyncReducers: AsyncReducers[] = [
  ['advertisements', advertisementsReducer],
];

export default asyncReducers;
