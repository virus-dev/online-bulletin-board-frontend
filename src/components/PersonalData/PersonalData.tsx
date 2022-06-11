import React from 'react';
import UserAPI from 'Services/UserAPI';
import Button, { ButtonVariant } from 'Storybook/Button/Button';
import useIsAuth from 'Hooks/useIsAuth';
import { RouteNames } from 'Models/Route';
import Loader from 'Components/storybook/Loader/Loader';
import { selectorUser } from 'Store/user/userSelectors';
import { useAppSelector } from 'Hooks/redux';
import PersonalDataItem from './PersonalDataItem/PersonalDataItem';

import s from './PersonalData.module.scss';

const PersonalData: React.FC = () => {
  const { isModeratorRole, isLoading: isLoadingAuth } = useIsAuth();

  const {
    isLoading,
    data: {
      email, firstName, secondName, phone, role,
    },
  } = useAppSelector(selectorUser);

  const [update] = UserAPI.useUpdateMutation();

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
          <Loader />
        ) : (
          <>
            <PersonalDataItem name="Имя">{firstName}</PersonalDataItem>
            <PersonalDataItem name="Фамилия">{secondName}</PersonalDataItem>
            <PersonalDataItem name="email">{email}</PersonalDataItem>
            <PersonalDataItem name="phone">{phone}</PersonalDataItem>
            <PersonalDataItem name="role">{role}</PersonalDataItem>
            <div className={s.downloadAvatar}>
              <p className={s.likeLabel}>Загрузить аватар</p>
              <input type="file" onChange={onChangeHandler} />
            </div>
          </>
        )
      }
      <div className={s.buttonsWrapper}>
        <Button onClick={onClickHandler}>Выйти</Button>
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
    </div>
  );
};

export default PersonalData;
