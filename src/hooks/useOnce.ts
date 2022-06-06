import { useRef } from 'react';

const useOnce = (callback: () => void) => {
  const isUsed = useRef(false);

  if (!isUsed.current) {
    isUsed.current = true;
    callback();
  }
};

export default useOnce;
