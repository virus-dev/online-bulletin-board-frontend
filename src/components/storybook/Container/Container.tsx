import React from 'react';

import s from './Container.module.scss';

interface ContainerProps {
  children: React.ReactNode,
  className?: string,
}

const Container: React.FC<ContainerProps> = ({ children, className }) => (
  <div className={`${s.container} ${className}`}>{children}</div>
);

// Todo как избавиться от defaultProps без export'а интерфейса?
Container.defaultProps = {
  className: undefined,
};

export default Container;
