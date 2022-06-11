import React, { useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from 'Storybook/Input/Input';
import Button, { ButtonVariant } from 'Storybook/Button/Button';
import Label from 'Storybook/Label/Label';
import StyledLink from 'Storybook/StyledLink/StyledLink';
import { useAppDispatch } from 'Hooks/redux';
import { userSlice } from 'Store/user/userSlice';
import { RouteNames } from 'Models/Route';
import { UserResponseData } from 'Models/User';
import reqLogin from './helpers/reqLogin';

import s from './Login.module.scss';

interface LoginProps {
  changeIsLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ changeIsLogin }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosResponse<unknown, unknown> | undefined>(undefined);

  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: '',
  });

  const inputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setLoginInputs((prev) => ({ ...prev, [key]: target.value }));
  };

  const onSucces = ({ data }: AxiosResponse<UserResponseData, unknown>) => {
    setIsLoading(false);
    localStorage.setItem('JWT', data.token);
    const { setUserData } = userSlice.actions;
    dispatch(setUserData(data));
    navigate(RouteNames.MAIN);
  };

  const onError = (data: AxiosError<unknown, unknown>) => {
    setIsLoading(false);
    setError(data.response);
  };

  const onLogin = async () => {
    setIsLoading(true);
    reqLogin(
      loginInputs,
      onSucces,
      onError,
    );
  };

  const errorJSX = () => {
    if (error && error.status && error.status !== 400) {
      const errorText = typeof error.data === 'string' && error.headers['content-type'] === 'application/json; charset=utf-8' ? error.data : 'Неизвестая ошибка';
      return <div className={s.error}>{errorText}</div>;
    }

    return '';
  };

  return (
    <div className={s.login}>
      <div className={s.title}>Вход в аккаунт</div>
      <Label htmlFor="email">
        Почта
      </Label>
      <Input
        value={loginInputs.email}
        onChange={(e) => inputHandler(e, 'email')}
        placeholder="Введите почту"
        name="email"
        className={s.input}
        fullWidth
      />
      <Label htmlFor="password" className={s.label}>
        Пароль
      </Label>
      <Input
        value={loginInputs.password}
        onChange={(e) => inputHandler(e, 'password')}
        placeholder="Введите пароль"
        name="password"
        type="password"
        className={s.input}
        fullWidth
      />
      <StyledLink className={s.link} onClick={changeIsLogin}>
        У меня нет аккаунта
      </StyledLink>
      <Button
        onClick={onLogin}
        className={s.button}
        isLoading={isLoading}
        variant={ButtonVariant.green}
      >
        Войти
      </Button>
      {errorJSX()}
    </div>
  );
};

export default Login;
