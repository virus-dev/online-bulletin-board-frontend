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
  name: string,
  type?: string,
  error?: string,
}

const Input: React.FC<InputProps> = ({
  onChange, value, iconLeft, className, fullWidth, placeholder = 'Введите текст', name, type = 'text', error,
}) => (
  <>
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
        type={type}
        placeholder={placeholder}
        name={name}
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
    {error && (
      <div className={s.error}>{error}</div>
    )}
  </>
);

export default Input;
