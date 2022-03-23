import React from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/Input';
import Button, { ButtonProps } from '../Button/Button';

import s from './InputWithBtn.module.scss';

interface InputWithBtnButton {
  classNameButton?: string,
  iconLeftButton?: React.ReactNode,
  iconRigthButton?: React.ReactNode,
}

interface InputWithBtnInput {
  classNameInput?: string,
  iconLeftInput?: React.ReactNode,
}

type InputWithBtnProps =
Omit<InputProps, 'className' & 'iconLeft'> &
Omit<ButtonProps, 'className' & 'iconLeft' & 'iconRigth'> &
Omit<InputWithBtnButton, ''> &
Omit<InputWithBtnInput, ''>;

const InputWithBtn: React.FC<InputWithBtnProps> = ({
  // Input
  onChange,
  value,
  iconLeftInput,
  classNameInput,
  fullWidth,
  // Button
  onClick,
  classNameButton,
  children,
  variant,
  iconLeftButton,
  iconRigthButton,
}) => (
  <div
    className={classNames(
      s.inputWithBtnWrapper,
      fullWidth && s.fullWidth,
    )}
  >
    <Input
      onChange={onChange}
      value={value}
      iconLeft={iconLeftInput}
      fullWidth={fullWidth}
      className={classNames(
        classNameInput,
        s.inputWithBtnInput,
      )}
    />
    <Button
      onClick={onClick}
      className={classNames(
        classNameButton,
        s.inputWithBtnButton,
      )}
      variant={variant}
      iconLeft={iconLeftButton}
      iconRigth={iconRigthButton}
    >
      {children}
    </Button>
  </div>
);

export default InputWithBtn;
