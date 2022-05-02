import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getChat } from '../../store/actionCreators/messagesActionCreators';
import { messagesSlice } from '../../store/reducers/messagesSlice';
import Message from '../Message/Message';
import MessageSendPanel from '../MessageSendPanel/MessageSendPanel';

import s from './ChatWindow.module.scss';

const ChatWindow: React.FC = () => {
  const { search } = useLocation();
  const diapatch = useAppDispatch();
  const { chatWithUserId, messages } = useAppSelector((state) => state.messages.chat);
  console.log('messages', messages);

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

  if (!chatWithUserId) {
    return <div>null</div>;
  }

  return (
    <div className={s.chatWrapper}>
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
      <MessageSendPanel />
    </div>
  );
};

export default ChatWindow;
