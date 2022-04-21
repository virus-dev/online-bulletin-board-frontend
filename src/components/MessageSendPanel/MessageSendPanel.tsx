import React, { useContext, useState } from 'react';
import Button from '../storybook/Button/Button';
import SocketContext from '../../context/SocketContext';

import s from './MessageSendPanel.module.scss';
import UserApi from '../../services/UserApi';
import { useAppSelector } from '../../hooks/redux';

const MessageSendPanel = () => {
  const { socket } = useContext(SocketContext);
  const [message, setMessage] = useState('');
  const { data: { id } = {} } = UserApi.useGetDataQuery();
  const chatWithUserId = useAppSelector(({ messages }) => messages.chat.chatWithUserId);

  const onChangeHandler = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(target.value);
  };

  const onClickHandler = () => {
    const sendObj = {
      method: 'sendMessage',
      fromUserId: id,
      toUserId: chatWithUserId,
      message,
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
