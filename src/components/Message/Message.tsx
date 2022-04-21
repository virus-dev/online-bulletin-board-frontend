import React from 'react';
import classNames from 'classnames';
import { Message as IMessage, Status } from '../../models/Message';
import UserApi from '../../services/UserApi';
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
  const {
    data: { image, firstName, secondName } = {},
  } = UserApi.useGetDataByIdQuery(fromUserId);

  const statusText = status === Status.read ? 'Прочитано' : 'Доставлено';

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
        <div className={s.message}>{message}</div>
        <div className={s.status}>{statusText}</div>
        <div className={s.date}>{createdAt}</div>
      </div>
    </div>
  );
};

export default Message;
