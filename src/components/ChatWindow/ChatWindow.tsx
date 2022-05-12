import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from 'Storybook/Loader/Loader';
import { useAppDispatch, useAppSelector } from 'Hooks/redux';
import { getChat } from 'Store/actionCreators/messagesActionCreators';
import { messagesSlice } from 'Store/reducers/messagesSlice';
import Message from '../Message/Message';
import MessageSendPanel from '../MessageSendPanel/MessageSendPanel';

import s from './ChatWindow.module.scss';

const ChatWindow: React.FC = () => {
  const { search } = useLocation();
  const diapatch = useAppDispatch();
  const { chatWithUserId, messages, isLoading } = useAppSelector((state) => state.messages.chat);

  useEffect(() => {
    const query = new URLSearchParams(search);
    const chatWithUserIdParam = query.get('chatWithUserId');

    if (chatWithUserIdParam) {
      const { setChatWithUserId } = messagesSlice.actions;
      diapatch(setChatWithUserId(Number(chatWithUserIdParam)));
    }

    if (!chatWithUserId && !chatWithUserIdParam) {
      return;
    }

    diapatch(getChat(chatWithUserId || Number(chatWithUserIdParam)));
  }, [chatWithUserId, diapatch, search]);

  const jsxInner = () => {
    if (!chatWithUserId) {
      return <div />;
    }

    if (isLoading) {
      return <div className={s.loaderWrapper}><Loader size="250px" /></div>;
    }

    return (
      <>
        <div className={s.chatWindowWrapper}>
          <div className={s.chatWindow}>
            {messages.map(({
              id, message, createdAt, fromUserId, status, toUserId,
            }) => (
              <Message
                key={id}
                isYourMessage={chatWithUserId !== fromUserId}
                chatWithUserId={chatWithUserId}
                message={message}
                createdAt={createdAt}
                fromUserId={fromUserId}
                id={id}
                status={status}
                toUserId={toUserId}
              />
            ))}
          </div>
        </div>
        <MessageSendPanel />
      </>
    );
  };

  return (
    <div className={s.chatWrapper}>
      {jsxInner()}
    </div>
  );
};

export default ChatWindow;
