import makeRequest, { HTTPMethods } from 'Packages/api/makeRequest';
import { AdvertisementResponseData } from './types';

export type AdvertisementDisconfirmReqData = {
  advertisementId: number,
};

export type AdvertisementDisconfirmResponse = AdvertisementResponseData;

export default (
  data: AdvertisementDisconfirmReqData,
) => makeRequest<AdvertisementDisconfirmResponse>({
  url: 'advertisement/disconfirmModeration',
  method: HTTPMethods.PUT,
  withHeaderAutorization: true,
  data,
});
