import React from 'react';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';

import s from './Button.module.scss';
import Loader from '../Loader/Loader';

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
  onClick?: () => void,
  href?: string,
  isLoading?: boolean,
  loadingRenderProps?: () => React.ReactElement | React.ReactNode,
}

const loadingRenderPropsInitial = () => <Loader color="#fff" size="24px" />;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = ButtonVariant.blue,
  className,
  iconLeft,
  iconRigth,
  onClick,
  href,
  isLoading,
  loadingRenderProps = loadingRenderPropsInitial,
}) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (isLoading) {
      return;
    }

    onClick?.();

    if (href) {
      navigate(href);
    }
  };

  return (
    <button
      type="button"
      onClick={onClickHandler}
      className={classnames(
        className,
        s.button,
        variant === ButtonVariant.blue && s.blue,
        variant === ButtonVariant.green && s.green,
        variant === ButtonVariant.gray && s.gray,
      )}
    >
      {
        isLoading && loadingRenderProps ? loadingRenderProps() : (
          <>
            {iconLeft && (
              <span className={s.iconLeft}>{iconLeft}</span>
            )}
            <span className={s.children}>{children}</span>
            {iconRigth && (
              <span className={s.iconRigth}>{iconRigth}</span>
            )}
          </>
        )
      }
    </button>
  );
};

export default Button;
