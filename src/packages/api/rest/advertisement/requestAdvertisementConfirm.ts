import makeRequest, { HTTPMethods } from 'Packages/api/makeRequest';
import { AdvertisementResponseData } from './types';

export type AdvertisementConfirmReqData = {
  advertisementId: number,
};

export type AdvertisementConfirmResponse = AdvertisementResponseData;

export default (data: AdvertisementConfirmReqData) => makeRequest<AdvertisementConfirmResponse>({
  url: 'advertisement/confirmModeration',
  method: HTTPMethods.PUT,
  withHeaderAutorization: true,
  data,
});
