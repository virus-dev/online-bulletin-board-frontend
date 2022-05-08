import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import UserApi from '../../services/UserApi';
import { getDialogs } from '../../store/actionCreators/messagesActionCreators';
import { messagesSlice } from '../../store/reducers/messagesSlice';
import DialogItem from '../DialogItem/DialogItem';
import Loader from '../storybook/Loader/Loader';

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
