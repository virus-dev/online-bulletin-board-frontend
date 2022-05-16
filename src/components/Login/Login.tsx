import React, { useState } from 'react';
import Input from 'Storybook/Input/Input';
import Button, { ButtonVariant } from 'Storybook/Button/Button';
import UserAPI from 'Services/UserAPI';
import Label from 'Storybook/Label/Label';
import StyledLink from 'Storybook/StyledLink/StyledLink';
import getErrorValidationMessage from 'Utils/getErrorMessage';

import s from './Login.module.scss';

interface LoginProps {
  changeIsLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ changeIsLogin }) => {
  const [login, { error, isLoading }] = UserAPI.useLoginMutation();

  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: '',
  });

  const inputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setLoginInputs((prev) => ({ ...prev, [key]: target.value }));
  };

  const onLogin = () => {
    login(loginInputs);
  };

  const errorJSX = () => {
    // TODO: Разобраться
    // eslint-disable-next-line
    // @ts-ignore: Unreachable code error
    if (error && error.status && error.status !== 400) {
      // eslint-disable-next-line
      // @ts-ignore: Unreachable code error
      return <div className={s.error}>{error.data}</div>;
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
        error={getErrorValidationMessage(error, 'email')}
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
        error={getErrorValidationMessage(error, 'password')}
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
