import React from 'react';
import Loader from 'Storybook/Loader/Loader';
import classnames from 'classnames';

import s from './ButtonIcon.module.scss';

export interface ButtonIconProps {
  className?: string,
  icon?: React.ReactNode,
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  isLoading?: boolean,
  loadingRenderProps?: () => React.ReactElement | React.ReactNode,
}
const loadingRenderPropsInitial = () => <Loader color="#fff" size="24px" />;

const ButtonIcon: React.FC<ButtonIconProps> = ({
  onClick,
  className,
  icon,
  isLoading,
  loadingRenderProps = loadingRenderPropsInitial,
}) => (
  <button
    type="button"
    onClick={(e)=> onClick(e)}
    className={classnames(
      className,
      s.button,
    )}
  >
    {
        isLoading && loadingRenderProps ? loadingRenderProps()
          : (icon && <span className={s.icon}>{icon}</span>)
      }
  </button>
);
export default ButtonIcon;
