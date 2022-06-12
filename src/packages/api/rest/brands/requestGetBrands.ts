import makeRequest, { HTTPMethods } from 'Packages/api/makeRequest';
import { BrandsResponseData } from './types';

export type BrandsReqData = {
  categoryId: number
};

export type BrandsResponse = BrandsResponseData;

export default (params: BrandsReqData) => makeRequest<BrandsResponse>({
  url: 'Brands/getBrands',
  method: HTTPMethods.GET,
  params,
});
