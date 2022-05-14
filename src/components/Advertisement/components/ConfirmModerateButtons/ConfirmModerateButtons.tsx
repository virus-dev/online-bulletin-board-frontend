import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdvertisementAPI from 'Services/AdvertisementAPI';
import Button, { ButtonVariant } from 'Storybook/Button/Button';

const ConfirmModerateButtons = () => {
  const { advertisementId } = useParams();
  const navigate = useNavigate();
  const [
    confirm,
    { isSuccess: isSuccessConfirm },
  ] = AdvertisementAPI.useConfirmModerationMutation();
  const [
    disconfirm,
    { isSuccess: isSuccessDisonfirm },
  ] = AdvertisementAPI.useDisconfirmModerationMutation();

  const onClickConfirmHandler = async () => {
    try {
      confirm(Number(advertisementId));
    } catch (e) {
      // empty
    }
  };

  const onClickDisconfirmHandler = async () => {
    try {
      disconfirm(Number(advertisementId));
    } catch (e) {
      // empty
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
