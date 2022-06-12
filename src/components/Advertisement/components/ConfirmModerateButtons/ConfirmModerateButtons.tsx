import React from 'react';
import useCreateRequest from 'Hooks/useCreateRequest';
import { useNavigate, useParams } from 'react-router-dom';
import Button, { ButtonVariant } from 'Storybook/Button/Button';
import requestAdvertisementDisconfirm,
{
  AdvertisementDisconfirmResponse,
  AdvertisementDisconfirmReqData,
} from 'Packages/api/rest/advertisement/requestAdvertisementDisconfirm';
import requestAdvertisementConfirm,
{
  AdvertisementConfirmResponse,
  AdvertisementConfirmReqData,
} from 'Packages/api/rest/advertisement/requestAdvertisementConfirm';
import { RouteNames } from 'Models/Route';

const ConfirmModerateButtons = () => {
  const { advertisementId } = useParams();
  const navigate = useNavigate();

  const onSucces = () => {
    navigate(RouteNames.ADVERTISEMENT_MODERATION);
  };

  const {
    fetchReq: fetchReqConfirm,
  } = useCreateRequest<AdvertisementConfirmResponse, AdvertisementConfirmReqData>({
    restReq: (adId) => requestAdvertisementConfirm({ advertisementId: Number(adId) }),
    onSucces,
  });

  const onClickConfirmHandler = () => {
    if (advertisementId) {
      fetchReqConfirm({
        advertisementId: Number(advertisementId),
      });
    }
  };

  const {
    fetchReq: fetchReqDisconfirm,
  } = useCreateRequest<AdvertisementDisconfirmResponse, AdvertisementDisconfirmReqData>({
    // TODO: Как TS объяснить, что если я передаю сюда параметр, то он уже точно не undefined?
    restReq: (reqData) => requestAdvertisementDisconfirm(reqData as AdvertisementDisconfirmReqData),
    onSucces,
  });

  const onClickDisconfirmHandler = async () => {
    if (advertisementId) {
      fetchReqDisconfirm({
        advertisementId: Number(advertisementId),
      });
    }
  };

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
