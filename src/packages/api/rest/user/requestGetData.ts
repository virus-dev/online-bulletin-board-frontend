import makeRequest, { HTTPMethods } from 'Packages/api/makeRequest';
import { UserResponseData } from './types';

export type LoginReqData = void;

export type GetDataResponse = UserResponseData;

export default () => makeRequest<GetDataResponse>({
  url: 'user/getData',
  method: HTTPMethods.GET,
  withHeaderAutorization: true,
});
