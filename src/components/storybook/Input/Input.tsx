import React from 'react';
import classNames from 'classnames';

import s from './Input.module.scss';

export interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  iconLeft?: React.ReactNode,
  className?: string,
  fullWidth?: boolean,
  placeholder?: string,
}

const Input: React.FC<InputProps> = ({
  onChange, value, iconLeft, className, fullWidth, placeholder = 'Введите текст',
}) => (
  <div
    className={classNames(
      s.inputWrapper,
      fullWidth && s.fullWidth,
    )}
  >
    {iconLeft && (
      <p className={s.iconLeft}>{iconLeft}</p>
    )}
    <input
      type="text"
      placeholder={placeholder}
      className={classNames(
        className,
        s.input,
        iconLeft && s.inputWithLeftIcon,
        fullWidth && s.fullWidth,
      )}
      onChange={onChange}
      value={value}
    />
  </div>
);

export default Input;
