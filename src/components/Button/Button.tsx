import React from 'react';
import classnames from 'classnames';

import s from './Button.module.scss';

export enum ButtonVariant {
  blue = 'blue',
  green = 'green',
  gray = 'gray',
}

export interface ButtonProps {
  children: React.ReactNode,
  variant?: ButtonVariant,
  className?: string,
  iconLeft?: React.ReactNode,
  iconRigth?: React.ReactNode,
  onClick: () => void,
}

const Button: React.FC<ButtonProps> = ({
  children, variant = ButtonVariant.blue, className, iconLeft, iconRigth, onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={classnames(
      className,
      s.button,
      variant === ButtonVariant.blue && s.blue,
      variant === ButtonVariant.green && s.green,
      variant === ButtonVariant.gray && s.gray,
    )}
  >
    {iconLeft && (
      <span className={s.iconLeft}>{iconLeft}</span>
    )}
    <span className={s.children}>{children}</span>
    {iconRigth && (
      <span className={s.iconRigth}>{iconRigth}</span>
    )}
  </button>
);

export default Button;
