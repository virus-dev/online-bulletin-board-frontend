import React, { useEffect, useRef } from 'react';

interface LoadTriggerProps {
  callback?: () => void,
}

const LoadTrigger: React.FC<LoadTriggerProps> = ({ callback }) => {
  const lastElement = useRef(null);
  const observer = useRef<null | IntersectionObserver>(null);
  const isIntersecting = useRef(false);

  useEffect(() => {
    // TODO: Добавить тип
    // eslint-disable-next-line
    // @ts-ignore: Unreachable code error
    const fn = (entries) => {
      if (entries[0].isIntersecting && !isIntersecting.current) {
        isIntersecting.current = true;
        callback?.();
      } else if (!entries[0].isIntersecting && isIntersecting.current) {
        isIntersecting.current = false;
      }
    };
    observer.current = new IntersectionObserver(fn);
    if (lastElement.current) {
      observer.current.observe(lastElement.current);
    }
  }, [callback, isIntersecting]);

  // TODO: className
  return <div style={{ height: '1px' }} ref={lastElement} />;
};

export default LoadTrigger;
