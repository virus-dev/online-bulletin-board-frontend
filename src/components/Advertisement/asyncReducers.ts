import { AsyncReducers } from 'Models/AsyncReducers';
import advertisementReducer from 'Store/advertisement/advertisementSlice';

const asyncReducers: AsyncReducers[] = [
  ['advertisement', advertisementReducer],
];

export default asyncReducers;
