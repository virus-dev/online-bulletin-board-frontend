import React, { useEffect } from 'react';
import Loader from 'Storybook/Loader/Loader';
import { useAppDispatch, useAppSelector } from 'Hooks/redux';
import UserAPI from 'Services/UserAPI';
import { fetchDialogs } from 'Store/messages/messagesAsyncActions';
import { messagesSlice } from 'Store/messages/messagesSlice';
import { selectorMessagesDialogData, selectorMessagesDialogIsLoading } from 'Store/messages/messagesSelectors';
import DialogItem from '../DialogItem/DialogItem';

import s from './Dialogs.module.scss';

const Dialogs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: { id } = {}, isLoading } = UserAPI.useGetDataQuery();
  const dialogs = useAppSelector(selectorMessagesDialogData);
  const isLoadingDialogs = useAppSelector(selectorMessagesDialogIsLoading);

  useEffect(() => {
    dispatch(fetchDialogs());
  }, [dispatch]);

  const onClickHandler = (chatWithUserId: number) => {
    const { setChatWithUserId } = messagesSlice.actions;
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
    ));
  };

  return (
    <div className={s.dialogsWrapper}>
      {jsxInner()}
    </div>
  );
};

export default Dialogs;
