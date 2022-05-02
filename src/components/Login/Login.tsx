import React, { useState } from 'react';
import Input from '../storybook/Input/Input';
import Button from '../storybook/Button/Button';

import s from './Login.module.scss';
import UserApi from '../../services/UserApi';

interface LoginProps {
  changeIsLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ changeIsLogin }) => {
  const [login] = UserApi.useLoginMutation();

  const [loginInputs, setLoginInputs] = useState({
    email: 'email1@mail.ru',
    password: '123',
  });

  const inputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setLoginInputs((prev) => ({ ...prev, [key]: target.value }));
  };

  const onLogin = () => {
    login(loginInputs);
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
          Зарегистрироваться
        </Button>
        <Button
          onClick={onLogin}
        >
          go
        </Button>
      </div>
    </div>
  );
};

export default Login;
