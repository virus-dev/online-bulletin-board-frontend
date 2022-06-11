import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from 'Storybook/Input/Input';
import Button, { ButtonVariant } from 'Storybook/Button/Button';
import Label from 'Storybook/Label/Label';
import StyledLink from 'Storybook/StyledLink/StyledLink';
import { useAppDispatch } from 'Hooks/redux';
import { userSlice } from 'Store/user/userSlice';
import { RouteNames } from 'Models/Route';
import useCreateRequest, { OnSuccesParams } from 'Hooks/useCreateRequest';
import requestLogin, { LoginReqData, LoginResponse } from 'Packages/api/rest/user/requestLogin';

import s from './Login.module.scss';

interface LoginProps {
  changeIsLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ changeIsLogin }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginInputs, setLoginInputs] = useState<LoginReqData>({
    email: '',
    password: '',
  });

  const onSucces = ({ data }: OnSuccesParams<LoginResponse>) => {
    localStorage.setItem('JWT', data.token);
    const { setUserData } = userSlice.actions;
    dispatch(setUserData(data));
    navigate(RouteNames.MAIN);
  };

  const {
    errorText,
    isLoading,
    func,
  } = useCreateRequest<LoginResponse, LoginReqData>({
    restReq: () => requestLogin(loginInputs),
    onSucces,
  });

  const inputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setLoginInputs((prev) => ({ ...prev, [key]: target.value }));
  };

  const onLogin = () => {
    func();
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
      {errorText && (
        <div className={s.error}>{errorText}</div>
      )}
    </div>
  );
};

export default Login;
