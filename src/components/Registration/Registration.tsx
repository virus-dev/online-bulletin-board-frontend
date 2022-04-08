import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import Input from '../storybook/Input/Input';
import Button from '../storybook/Button/Button';
import { registration } from '../../store/actionCreators/user';

import s from './Registration.module.scss';

interface RegistrationProps {
  changeIsLogin: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ changeIsLogin }) => {
  const dispatch = useAppDispatch();

  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: '',
    firstName: 'Пользователь',
  });

  const inputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setLoginInputs((prev) => ({ ...prev, [key]: target.value }));
  };

  const registrationHandler = () => {
    dispatch(registration(loginInputs));
  };

  return (
    <div className={s.authPage}>
      <div className={s.authBlock}>
        <Input
          value={loginInputs.email}
          onChange={(e) => inputHandler(e, 'email')}
          placeholder="Введите почту"
        />
        <Input
          value={loginInputs.password}
          onChange={(e) => inputHandler(e, 'password')}
          placeholder="Введите пароль"
        />
        <Button
          onClick={changeIsLogin}
        >
          Авторизоваться
        </Button>
        <Button
          onClick={registrationHandler}
        >
          gogo
        </Button>
      </div>
    </div>
  );
};

export default Registration;
