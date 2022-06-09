import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import { useCallback, useRef } from 'react';

const useDebounce = (callback: (...args: unknown[]) => void, delay: number) => {
  const timer = useRef<TimeoutId | null>(null);

  const debouncedCallback = useCallback((...args) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  return debouncedCallback;
};

export default useDebounce;
