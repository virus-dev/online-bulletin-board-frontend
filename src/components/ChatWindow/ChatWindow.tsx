import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getChat } from '../../store/actionCreators/messagesActionCreators';
import Message from '../Message/Message';
import MessageSendPanel from '../MessageSendPanel/MessageSendPanel';

import s from './ChatWindow.module.scss';

const ChatWindow: React.FC = () => {
  const diapatch = useAppDispatch();
  const { chatWithUserId, messages } = useAppSelector((state) => state.messages.chat);

  useEffect(() => {
    if (!chatWithUserId) {
      return;
    }

    diapatch(getChat(chatWithUserId));
  }, [chatWithUserId, diapatch]);

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
