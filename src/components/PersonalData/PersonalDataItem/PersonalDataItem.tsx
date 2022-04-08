import React from 'react';

import s from './PersonalDataItem.module.scss';

interface PersonalDataItemProps {
  name: string,
}

const PersonalDataItem: React.FC<PersonalDataItemProps> = ({ name, children }) => (
  <div className={s.item}>
    <div className={s.itemName}>{name}</div>
    <div className={s.itemChildren}>{children || 'Не указано'}</div>
    <div className={s.itemButton}>
      {children ? (
        'Изменить'
      ) : (
        'Добавить'
      )}
    </div>
  </div>
);

export default PersonalDataItem;
