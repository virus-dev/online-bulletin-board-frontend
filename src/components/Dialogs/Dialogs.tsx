import React, { useEffect } from 'react';
import Loader from 'Storybook/Loader/Loader';
import { useAppDispatch, useAppSelector } from 'Hooks/redux';
import { fetchDialogs } from 'Store/messages/messagesAsyncActions';
import { messagesSlice } from 'Store/messages/messagesSlice';
import { selectorMessagesDialogData, selectorMessagesDialogIsLoading } from 'Store/messages/messagesSelectors';
import { User } from 'Models/User';
import { selectorUser } from 'Store/user/userSelectors';
import DialogItem from '../DialogItem/DialogItem';

import s from './Dialogs.module.scss';

const Dialogs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data: { id } } = useAppSelector(selectorUser);
  const dialogs = useAppSelector(selectorMessagesDialogData);
  const isLoadingDialogs = useAppSelector(selectorMessagesDialogIsLoading);

  useEffect(() => {
    dispatch(fetchDialogs());
  }, [dispatch]);

  const onClickHandler = (chatWithUserId: number, userData: User) => {
    const { setChatWithUserId, setChatUser } = messagesSlice.actions;
    dispatch(setChatUser(userData));
    dispatch(setChatWithUserId(chatWithUserId));
  };

  const jsxInner = () => {
    if (isLoading || (isLoadingDialogs || !id)) {
      return <div className={s.loaderWrapper}><Loader size="200px" /></div>;
    }

    if (!dialogs.length) {
      return <div className={s.noDialogs}>Диалогов нет</div>;
    }

    return dialogs.map(({
      createdAt, fromUserId, message: lastMessage, toUserId, unreadMessagesCount, user,
    }) => (
      <DialogItem
        key={lastMessage + fromUserId + toUserId}
        lastMessage={lastMessage}
        unreadMessagesCount={unreadMessagesCount}
        createdAt={createdAt}
        onClick={
          (userData: User) => onClickHandler(id === fromUserId ? toUserId : fromUserId, userData)
        }
        user={user}
      />
    ));
  };

  return (
    <div className={s.dialogsWrapper}>
      {jsxInner()}
    </div>
  );
};

export default Dialogs;
