import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import UserApi from '../../services/UserApi';
import { getDialogs } from '../../store/actionCreators/messagesActionCreators';
import { messagesSlice } from '../../store/reducers/messagesSlice';
import DialogItem from '../DialogItem/DialogItem';

import s from './Dialogs.module.scss';

const Dialogs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: { id } = {} } = UserApi.useGetDataQuery();
  const dialogs = useAppSelector(({ messages }) => messages.dialogs);

  useEffect(() => {
    dispatch(getDialogs());
  }, [dispatch]);

  const onClickHandler = (chatWithUserId: number) => {
    const { setChatWithUserId } = messagesSlice.actions;
    dispatch(setChatWithUserId(chatWithUserId));
  };

  if (!id || !dialogs) {
    return <div>Loading</div>;
  }

  return (
    <div className={s.dialogsWrapper}>
      {dialogs.map(({
        createdAt, fromUserId, message: lastMessage, toUserId, unreadMessagesCount,
      }) => (
        <DialogItem
          key={lastMessage + fromUserId + toUserId}
          fromUserId={fromUserId}
          lastMessage={lastMessage}
          toUserId={toUserId}
          yourId={id}
          unreadMessagesCount={unreadMessagesCount}
          createdAt={createdAt}
          onClick={() => onClickHandler(id === fromUserId ? toUserId : fromUserId)}
        />
      ))}
    </div>
  );
};

export default Dialogs;
