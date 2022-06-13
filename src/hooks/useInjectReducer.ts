import { AsyncReducers } from 'Models/AsyncReducers';
import { injectReducer } from 'Store/store';
import useOnce from './useOnce';

const useInjectAsyncReducers = (asyncReducers: AsyncReducers[]) => {
  useOnce(() => {
    asyncReducers.forEach(([key, reducer]) => {
      injectReducer(key, reducer);
    });
  });
};

export default useInjectAsyncReducers;
