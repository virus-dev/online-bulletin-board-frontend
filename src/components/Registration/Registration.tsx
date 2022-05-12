import React, { useState } from 'react';
import Input from 'Storybook/Input/Input';
import Button from 'Storybook/Button/Button';
import UserApi from 'Services/UserApi';
import Label from 'Storybook/Label/Label';
import StyledLink from 'Storybook/StyledLink/StyledLink';
import getErrorValidationMessage from 'Utils/getErrorMessage';

import s from './Registration.module.scss';

interface RegistrationProps {
  changeIsLogin: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ changeIsLogin }) => {
  const [registration, { error, isLoading }] = UserApi.useRegistrationMutation();

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
    <div className={s.registration}>
      <div className={s.title}>Регистрация</div>
      <Label htmlFor="firstName" className={s.label}>Имя</Label>
      <Input
        value={loginInputs.firstName}
        onChange={(e) => inputHandler(e, 'firstName')}
        placeholder="Введите ваше имя"
        name="firstName"
        className={s.input}
        error={getErrorValidationMessage(error, 'firstName')}
        fullWidth
      />
      <Label htmlFor="email" className={s.label}>Почта</Label>
      <Input
        value={loginInputs.email}
        onChange={(e) => inputHandler(e, 'email')}
        placeholder="Введите почту"
        name="email"
        className={s.input}
        error={getErrorValidationMessage(error, 'email')}
        fullWidth
      />
      <Label htmlFor="password" className={s.label}>Пароль</Label>
      <Input
        value={loginInputs.password}
        onChange={(e) => inputHandler(e, 'password')}
        placeholder="Введите пароль"
        name="password"
        type="password"
        className={s.input}
        error={getErrorValidationMessage(error, 'password')}
        fullWidth
      />
      <StyledLink onClick={changeIsLogin} className={s.link}>
        У меня есть аккаунт
      </StyledLink>
      <Button
        onClick={registrationHandler}
        className={s.button}
        isLoading={isLoading}
      >
        Зарегистрироваться
      </Button>
      {errorJSX()}
    </div>
  );
};

export default Registration;
