import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useIsAuth from '../../../../hooks/useIsAuth';
import UserApi from '../../../../services/UserApi';
import { getDialogs } from '../../../../store/actionCreators/messagesActionCreators';
import IconProfile from '../../../IconProfile/IconProfile';
import Button from '../../../storybook/Button/Button';
import AdvertisementOwnerLoading from '../AdvertisementOwnerLoading/AdvertisementOwnerLoading';
import SocketContext from '../../../../context/SocketContext';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

interface AdvertisementOwnerSuccessProps {
  userId: number,
}

const AdvertisementOwnerSuccess: React.FC<AdvertisementOwnerSuccessProps> = ({
  userId,
}) => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useIsAuth();
  const { socket } = useContext(SocketContext);
  const dialogs = useAppSelector(({ messages }) => messages.dialogs.data);

  const {
    data: { image, firstName, secondName } = {}, isLoading,
  } = UserApi.useGetDataByIdQuery(userId);
  const { data: { id: yourId } = {} } = UserApi.useGetDataQuery();

  useEffect(() => {
    dispath(getDialogs());
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
      {
        isLoading
          ? <AdvertisementOwnerLoading />
          : (
            <div>
              <IconProfile image={image} firstName={firstName} secondName={secondName} />
              <Button onClick={onClick}>{buttonText()}</Button>
            </div>
          )
      }
    </div>
  );
};

export default AdvertisementOwnerSuccess;
