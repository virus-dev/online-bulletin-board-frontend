import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdvertisementApi from 'Services/AdvertisementAPI';
import Button, { ButtonVariant } from 'Storybook/Button/Button';

import s from './ConfirmModerateButtons.module.scss';

const ConfirmModerateButtons = () => {
  const { advertisementId } = useParams();
  const navigate = useNavigate();
  const [
    confirm,
    { isSuccess: isSuccessConfirm },
  ] = AdvertisementApi.useConfirmModerationMutation();
  const [
    disconfirm,
    { isSuccess: isSuccessDisonfirm },
  ] = AdvertisementApi.useDisconfirmModerationMutation();

  const onClickConfirmHandler = async () => {
    try {
      confirm(Number(advertisementId));
    } catch (e) {
      console.log(e);
    }
  };

  const onClickDisconfirmHandler = async () => {
    try {
      disconfirm(Number(advertisementId));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isSuccessConfirm || isSuccessDisonfirm) {
      navigate('/advertisement/moderation');
    }
  }, [isSuccessConfirm, isSuccessDisonfirm, navigate]);

  return (
    <div>
      <Button variant={ButtonVariant.green} onClick={onClickConfirmHandler}>
        Прошло модерацию
      </Button>
      <Button variant={ButtonVariant.gray} onClick={onClickDisconfirmHandler}>
        Не прошло модерацию
      </Button>
    </div>
  );
};

export default ConfirmModerateButtons;
