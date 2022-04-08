import React from 'react';
import UserApi from '../../services/UserApi';

import s from './PersonalData.module.scss';
import PersonalDataItem from './PersonalDataItem/PersonalDataItem';

const PersonalData: React.FC = () => {
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
            <input type="file" onChange={onChangeHandler} />
          </>
        )
      }
    </div>
  );
};

export default PersonalData;
