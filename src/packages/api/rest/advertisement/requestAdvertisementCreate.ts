import makeRequest, { HTTPMethods } from 'Packages/api/makeRequest';
import { AdvertisementResponseData } from './types';

export type AdvertisementReqData = FormData;

export type AdvertisementResponse = AdvertisementResponseData;

export default (data: AdvertisementReqData) => makeRequest<AdvertisementResponse>({
  url: 'advertisement/create',
  method: HTTPMethods.POST,
  withHeaderAutorization: true,
  data,
});
