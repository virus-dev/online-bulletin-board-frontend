import React from 'react';
import Loader from 'Storybook/Loader/Loader';
import classnames from 'classnames';

import s from './ButtonIcon.module.scss';

export interface ButtonIconProps {
  setActive: (prevState: any) => void,
  className?: string,
  active: boolean,
  icon?: React.ReactNode,
  onClick?: () => void,
  isLoading?: boolean,
  loadingRenderProps?: () => React.ReactElement | React.ReactNode,
}

const loadingRenderPropsInitial = () => <Loader color="#fff" size="24px" />;

const ButtonIcon: React.FC<ButtonIconProps> = ({
  className,
  active,
  icon,
  isLoading,
  setActive,
  loadingRenderProps = loadingRenderPropsInitial,
}) => {
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setActive(!active);
    e.stopPropagation();
  };
  return (
    <button
      type="button"
      onClick={(e) => onClickHandler(e)}
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
};
export default ButtonIcon;
