import React from 'react';
import UserApi from 'Services/UserApi';
import IconProfile from '../IconProfile/IconProfile';

import s from './DialogItem.module.scss';

interface DialogItemProps {
  yourId: number,
  fromUserId: number,
  toUserId: number,
  lastMessage: string,
  unreadMessagesCount: number,
  createdAt: Date,
  onClick: () => void,
}

const DialogItem: React.FC<DialogItemProps> = ({
  yourId, fromUserId, toUserId, lastMessage, unreadMessagesCount, createdAt, onClick,
}) => {
  const isYourMessageTheLastOne = yourId === fromUserId;

  const {
    data: { firstName, secondName, image } = {},
  } = UserApi.useGetDataByIdQuery(isYourMessageTheLastOne ? toUserId : fromUserId);

  return (
    <div className={s.dialogItemWrapper}>
      <button className={s.dialogItem} type="button" onClick={onClick}>
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
          {createdAt}
        </div>
      </button>
    </div>
  );
};

export default DialogItem;
