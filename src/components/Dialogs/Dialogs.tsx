import React, { useEffect } from 'react';
import Loader from 'Storybook/Loader/Loader';
import { useAppDispatch, useAppSelector } from 'Hooks/redux';
import UserApi from 'Services/UserApi';
import { getDialogs } from 'Store/actionCreators/messagesActionCreators';
import { messagesSlice } from 'Store/reducers/messagesSlice';
import DialogItem from '../DialogItem/DialogItem';

import s from './Dialogs.module.scss';

const Dialogs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: { id } = {}, isLoading } = UserApi.useGetDataQuery();
  const {
    data: dialogs,
    isLoading: isLoadingDialogs,
  } = useAppSelector(({ messages }) => messages.dialogs);

  useEffect(() => {
    dispatch(getDialogs());
  }, [dispatch]);

  const onClickHandler = (chatWithUserId: number) => {
    const { setChatWithUserId } = messagesSlice.actions;
    dispatch(setChatWithUserId(chatWithUserId));
  };

  const jsxInner = () => {
    if (isLoading || (isLoadingDialogs || !id)) {
      return <div className={s.loaderWrapper}><Loader size="200px" /></div>;
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
