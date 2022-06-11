import React, { useState } from 'react';
import Input from 'Storybook/Input/Input';
import Button, { ButtonVariant } from 'Storybook/Button/Button';
import Label from 'Storybook/Label/Label';
import StyledLink from 'Storybook/StyledLink/StyledLink';
import getErrorValidationMessage from 'Utils/getErrorMessage';
import { RouteNames } from 'Models/Route';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'Hooks/redux';
import { userSlice } from 'Store/user/userSlice';
import useCreateRequest, { OnSuccesParams } from 'Hooks/useCreateRequest';
import requestRegistration, { RegistrationReqData, RegistrationResponse } from 'Packages/api/rest/user/requestRegistration';

import s from './Registration.module.scss';

interface RegistrationProps {
  changeIsLogin: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ changeIsLogin }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [registrationInputs, setRegistrationInputs] = useState<RegistrationReqData>({
    firstName: '',
    email: '',
    password: '',
  });

  const onSucces = ({ data }: OnSuccesParams<RegistrationResponse>) => {
    localStorage.setItem('JWT', data.token);
    const { setUserData } = userSlice.actions;
    dispatch(setUserData(data));
    navigate(RouteNames.MAIN);
  };

  const {
    error,
    errorText,
    func,
    isLoading,
  } = useCreateRequest<RegistrationResponse, RegistrationReqData>({
    restReq: () => requestRegistration(registrationInputs),
    onSucces,
  });

  const inputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setRegistrationInputs((prev) => ({ ...prev, [key]: target.value }));
  };

  const onRegistration = () => {
    func();
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
      {errorText}
    </div>
  );
};

export default Registration;
