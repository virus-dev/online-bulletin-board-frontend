import React from 'react';
import { User } from 'Models/User';
import dateFromZFormat, { VariantsFormsts } from 'Utils/dateFromZFormat';
import IconProfile from '../IconProfile/IconProfile';

import s from './DialogItem.module.scss';

interface DialogItemProps {
  lastMessage: string,
  unreadMessagesCount: number,
  createdAt: string,
  onClick: (user: User) => void,
  user: User,
}

const DialogItem: React.FC<DialogItemProps> = ({
  lastMessage, unreadMessagesCount, createdAt, onClick, user,
}) => {
  const {
    firstName, secondName, image,
  } = user;

  return (
    <div className={s.dialogItemWrapper}>
      <button className={s.dialogItem} type="button" onClick={() => onClick(user)}>
        <div className={s.iconAndName}>
          <IconProfile firstName={firstName} secondName={secondName} image={image} />
          <span className={s.firstName}>{firstName}</span>
          <span className={s.secondName}>Фамилия</span>
        </div>
        <div className={s.message}>
          {lastMessage}
        </div>
        {!!unreadMessagesCount && (
          <div className={s.unreadMessagesCount}>
            {unreadMessagesCount}
          </div>
        )}
        <div className={s.date}>
          {dateFromZFormat({ date: createdAt, variantsFormsts: VariantsFormsts.time })}
        </div>
      </button>
    </div>
  );
};

export default DialogItem;
