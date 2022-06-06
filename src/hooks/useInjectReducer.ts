import { AsyncReducers } from 'Models/AsyncReducers';
import { injectReducer } from 'Store/store';
import useOnce from './useOnce';

const useInjectReducers = (reducers: AsyncReducers[]) => {
  useOnce(() => {
    reducers.forEach(([key, reducer]) => {
      injectReducer(key, reducer);
    });
  });
};

export default useInjectReducers;
