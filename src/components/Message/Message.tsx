import React, { useEffect, useRef, useContext } from 'react';
import classNames from 'classnames';
import { Message as IMessage, Status } from 'Models/Message';
import UserApi from 'Services/UserApi';
import SocketContext from 'Context/SocketContext/SocketContext';
import IconProfile from '../IconProfile/IconProfile';

import s from './Message.module.scss';

interface MessagePropsStill {
  isYourMessage: boolean,
  chatWithUserId: React.SetStateAction<number | null>,
}

type MessageProps = Omit<IMessage, ''> & Omit<MessagePropsStill, ''>;

const Message: React.FC<MessageProps> = ({
  createdAt, fromUserId, id, isYourMessage, message, status, toUserId, chatWithUserId,
}) => {
  const observer = useRef<null | IntersectionObserver>(null);
  const refMessage = useRef(null);
  const { socket } = useContext(SocketContext);

  const {
    data: { image, firstName, secondName } = {},
  } = UserApi.useGetDataByIdQuery(fromUserId);

  const statusText = status === Status.read ? 'Прочитано' : 'Доставлено';

  useEffect(() => {
    // TODO: Добавить тип
    const fn = (entries: any) => {
      if (!isYourMessage && status === Status.delivered && entries[0].isIntersecting) {
        const sendObj = {
          method: 'readMessage',
          token: `Bearer ${localStorage.getItem('JWT')}`,
          id,
          fromUserId,
          toUserId,
        };
        socket?.current?.send(JSON.stringify(sendObj));
      }
    };
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(fn);
    if (refMessage.current) {
      observer.current.observe(refMessage.current);
    }
    return () => {
      observer.current?.disconnect();
    };
  }, [fromUserId, id, isYourMessage, message, socket, status, toUserId]);

  return (
    <div
      className={classNames(
        s.messageWrapper,
        isYourMessage ? s.yourMessage : s.interlocutorMessage,
      )}
    >
      <div className={s.icon}>
        <IconProfile firstName={firstName} secondName={secondName} image={image} />
      </div>
      <div className={classNames(s.messageCloud, isYourMessage && s.yourMessageCloud)}>
        <div className={s.name}>{isYourMessage ? 'Вы' : `${firstName} ${secondName || ''}`}</div>
        <div className={s.message} ref={refMessage}>{message}</div>
        <div className={s.status}>{statusText}</div>
        <div className={s.date}>{createdAt}</div>
      </div>
    </div>
  );
};

export default Message;
