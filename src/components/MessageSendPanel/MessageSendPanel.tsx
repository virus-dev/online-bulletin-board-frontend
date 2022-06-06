import React, { useContext, useState } from 'react';
import Button from 'Storybook/Button/Button';
import SocketContext from 'Context/SocketContext';
import UserAPI from 'Services/UserAPI';
import { useAppSelector } from 'Hooks/redux';
import { selectorMessagesChatWithUserId } from 'Store/messages/messagesSelectors';

import s from './MessageSendPanel.module.scss';

const MessageSendPanel = () => {
  const { socket } = useContext(SocketContext);
  const [message, setMessage] = useState('');
  const { data: { id } = {} } = UserAPI.useGetDataQuery();
  const chatWithUserId = useAppSelector(selectorMessagesChatWithUserId);

  const onChangeHandler = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(target.value);
  };

  const onClickHandler = () => {
    const sendObj = {
      method: 'sendMessage',
      fromUserId: id,
      toUserId: chatWithUserId,
      message,
      token: `Bearer ${localStorage.getItem('JWT')}`,
    };

    socket?.current?.send(JSON.stringify(sendObj));
  };

  return (
    <div className={s.messageSendPanel}>
      <textarea className={s.textarea} onChange={onChangeHandler} />
      <Button onClick={onClickHandler}>Отправить</Button>
    </div>
  );
};

export default MessageSendPanel;
