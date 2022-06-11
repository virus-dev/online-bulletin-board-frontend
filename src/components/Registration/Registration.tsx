import React, { useState } from 'react';
import Input from 'Storybook/Input/Input';
import Button, { ButtonVariant } from 'Storybook/Button/Button';
import Label from 'Storybook/Label/Label';
import StyledLink from 'Storybook/StyledLink/StyledLink';
import getErrorValidationMessage from 'Utils/getErrorMessage';
import { RouteNames } from 'Models/Route';
import { AxiosError, AxiosResponse } from 'axios';
import { UserResponseData } from 'Models/User';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'Hooks/redux';
import { userSlice } from 'Store/user/userSlice';
import reqRegistration from './helpers/reqRegistration';

import s from './Registration.module.scss';

interface RegistrationProps {
  changeIsLogin: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ changeIsLogin }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosResponse<unknown, unknown> | undefined>(undefined);

  const [registrationInputs, setRegistrationInputs] = useState({
    firstName: '',
    email: '',
    password: '',
  });

  const inputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setRegistrationInputs((prev) => ({ ...prev, [key]: target.value }));
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

  const onRegistration = async () => {
    setIsLoading(true);
    reqRegistration(
      registrationInputs,
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
    <div className={s.registration}>
      <div className={s.title}>Регистрация</div>
      <Label htmlFor="firstName" className={s.label}>Имя</Label>
      <Input
        value={registrationInputs.firstName}
        onChange={(e) => inputHandler(e, 'firstName')}
        placeholder="Введите ваше имя"
        name="firstName"
        className={s.input}
        error={getErrorValidationMessage(error, 'firstName')}
        fullWidth
      />
      <Label htmlFor="email" className={s.label}>Почта</Label>
      <Input
        value={registrationInputs.email}
        onChange={(e) => inputHandler(e, 'email')}
        placeholder="Введите почту"
        name="email"
        className={s.input}
        error={getErrorValidationMessage(error, 'email')}
        fullWidth
      />
      <Label htmlFor="password" className={s.label}>Пароль</Label>
      <Input
        value={registrationInputs.password}
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
        onClick={onRegistration}
        className={s.button}
        isLoading={isLoading}
        variant={ButtonVariant.green}
      >
        Зарегистрироваться
      </Button>
      {errorJSX()}
    </div>
  );
};

export default Registration;
