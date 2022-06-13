import makeRequest, { HTTPMethods } from 'Packages/api/makeRequest';
import { CategoriesResponseData } from './types';

export type CategoriesReqData = void;

export type CategoriesResponse = CategoriesResponseData;

export default () => makeRequest<CategoriesResponse>({
  url: 'categories/getCategories',
  method: HTTPMethods.GET,
});
