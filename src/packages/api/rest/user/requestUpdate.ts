import makeRequest, { HTTPMethods } from 'Packages/api/makeRequest';
import { UserResponseData } from './types';

export type UpdateReqData = FormData;

export type UpdateResponse = UserResponseData;

export default (data: UpdateReqData) => makeRequest<UpdateResponse>({
  url: 'user/update',
  method: HTTPMethods.POST,
  withHeaderAutorization: true,
  data,
});
