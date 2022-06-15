/* eslint max-len: ["off"] */

import makeRequest, { HTTPMethods } from 'Packages/api/makeRequest';
import { AdvertisementsGetAllResponseData } from './types';

export type AdvertisementsGetAllReqParams = {
  limit: number,
  page: number,
  title?: string,
  sort?: string,
  categoryId?: number,
  brandId?: number,
  currentAdvertisements?: string,
  myAdvertisements?: boolean,
  moderation?: boolean,
};

export interface AdsAreOver {
  adsAreOver: boolean,
}

export type AdvertisementsGetAllResponse = AdvertisementsGetAllResponseData[] | AdsAreOver;

export default (params: AdvertisementsGetAllReqParams) => makeRequest<AdvertisementsGetAllResponse>({
  url: 'advertisement/getAll',
  method: HTTPMethods.GET,
  params,
});
