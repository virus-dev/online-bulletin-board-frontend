import React from 'react';
import UserApi from '../../services/UserApi';
import PersonalDataItem from './PersonalDataItem/PersonalDataItem';
import Button, { ButtonVariant } from '../storybook/Button/Button';
import useIsAuth from '../../hooks/useIsAuth';
import { RouteNames } from '../../models/Route';

import s from './PersonalData.module.scss';

const PersonalData: React.FC = () => {
  const { isModeratorRole, isLoading: isLoadingAuth } = useIsAuth();

  const {
    data: {
      email, firstName, secondName, phone, role,
    } = {},
    isLoading,
  } = UserApi.useGetDataQuery();

  const [update] = UserApi.useUpdateMutation();

  const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      update(formData);
    }
  };

  const onClickHandler = () => {
    localStorage.removeItem('JWT');
    window.location.href = '/';
  };

  return (
    <div className={s.personalData}>
      <div className={s.personalDataTitle}>Личная информация</div>
      {
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <PersonalDataItem name="Имя">{firstName}</PersonalDataItem>
            <PersonalDataItem name="Фамилия">{secondName}</PersonalDataItem>
            <PersonalDataItem name="email">{email}</PersonalDataItem>
            <PersonalDataItem name="phone">{phone}</PersonalDataItem>
            <PersonalDataItem name="role">{role}</PersonalDataItem>
            <p>Загрузить аватар</p>
            <input type="file" onChange={onChangeHandler} />
            <Button onClick={onClickHandler}>Выйти</Button>
          </>
        )
      }
      {
        isModeratorRole && !isLoadingAuth && (
          <Button
            variant={ButtonVariant.green}
            href={RouteNames.ADVERTISEMENT_MODERATION}
          >
            Модерация
          </Button>
        )
      }
      <Button
        href={RouteNames.ADVERTISEMENT_MY_ADVERTISEMENTS}
        variant={ButtonVariant.blue}
      >
        Мои объявления
      </Button>
    </div>
  );
};

export default PersonalData;
