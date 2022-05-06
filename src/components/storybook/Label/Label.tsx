import classNames from 'classnames';
import React from 'react';

import s from './Label.module.scss';

interface LabelProps {
  children: React.ReactElement | React.ReactNode,
  htmlFor: string,
  className?: string,
}

const Label: React.FC<LabelProps> = ({ children, htmlFor, className }) => (
  <label
    htmlFor={htmlFor}
    className={classNames(className, s.label)}
  >
    {children}
  </label>
);

Label.defaultProps = {
  className: undefined,
};

export default Label;
