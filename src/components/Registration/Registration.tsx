import React, { useState } from 'react';
import Input from '../storybook/Input/Input';
import Button from '../storybook/Button/Button';

import s from './Registration.module.scss';
import UserApi from '../../services/UserApi';

interface RegistrationProps {
  changeIsLogin: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ changeIsLogin }) => {
  const [registration] = UserApi.useRegistrationMutation();

  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: '',
    firstName: '',
  });

  const inputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setLoginInputs((prev) => ({ ...prev, [key]: target.value }));
  };

  const registrationHandler = () => {
    registration(loginInputs);
  };

  return (
    <div className={s.authPage}>
      <div className={s.authBlock}>
        <Input
          value={loginInputs.firstName}
          onChange={(e) => inputHandler(e, 'firstName')}
          placeholder="Введите ваше имя"
        />
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
