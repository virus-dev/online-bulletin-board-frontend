import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDialogs } from 'Store/messages/messagesAsyncActions';
import IconProfile from 'Components/IconProfile/IconProfile';
import Button, { ButtonVariant } from 'Storybook/Button/Button';
import SocketContext from 'Context/SocketContext';
import { useAppDispatch, useAppSelector } from 'Hooks/redux';
import { selectorUserData } from 'Store/user/userSelectors';
import { selectorMessagesDialogData } from 'Store/messages/messagesSelectors';
import { selectorAdvertisementDataUser } from 'Store/advertisement/advertisementSelectors';

import s from './AdvertisementOwner.module.scss';

// TODO: Мб нужно user на owner поиенять в стейте

const AdvertisementOwner: React.FC = () => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const {
    id: userId,
    firstName,
    secondName,
    image,
  } = useAppSelector(selectorAdvertisementDataUser);
  const { socket } = useContext(SocketContext);
  const dialogs = useAppSelector(selectorMessagesDialogData);
  const {
    id: yourId,
  } = useAppSelector(selectorUserData);
  const isAuth = !!yourId;

  useEffect(() => {
    dispath(fetchDialogs());
  }, [dispath]);

  const isDialogAlreadyThere = dialogs.findIndex((el) => (
    (el.fromUserId === userId && el.toUserId === yourId)
    || (el.toUserId === userId && el.fromUserId === yourId)
  )) !== -1;

  const isYourAdvertisement = userId === yourId;

  const onClick = () => {
    if (isYourAdvertisement) {
      return;
    }

    if (!isAuth) {
      navigate('/auth', {});
    }

    if (!isDialogAlreadyThere) {
      const message = `Здравствуйте! Я пишу по поводу этого объявления - ${window.location.href}`;

      const sendObj = {
        method: 'sendMessage',
        fromUserId: yourId,
        toUserId: userId,
        message,
        token: `Bearer ${localStorage.getItem('JWT')}`,
      };

      socket?.current?.send(JSON.stringify(sendObj));
    }

    navigate(`/chat?chatWithUserId=${userId}`);
  };

  const buttonText = () => {
    if (isYourAdvertisement) {
      return 'Это ваше объявление';
    }

    if (isDialogAlreadyThere) {
      return 'Перейти в диалог с продавцом';
    }

    return 'Написать продавцу';
  };

  return (
    <div>
      <div className={s.owner}>
        <div className={s.title}>Автор объявления</div>
        <div className={s.ownerInfo}>
          <IconProfile image={image} firstName={firstName} secondName={secondName} />
          <div className={s.firstName}>{firstName}</div>
          <div className={s.secondName}>{secondName}</div>
        </div>
        <Button
          onClick={onClick}
          variant={isYourAdvertisement ? ButtonVariant.gray : ButtonVariant.green}
        >
          {buttonText()}
        </Button>
      </div>
    </div>
  );
};

export default AdvertisementOwner;
