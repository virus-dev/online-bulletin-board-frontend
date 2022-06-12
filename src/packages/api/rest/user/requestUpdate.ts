import makeRequest, { HTTPMethods } from 'Packages/api/makeRequest';
import { UserResponseData } from './types';

export type UserReqData = FormData;

export type UserResponse = UserResponseData;

export default (data: UserReqData) => makeRequest<UserResponse>({
  url: 'user/update',
  method: HTTPMethods.POST,
  withHeaderAutorization: true,
  data,
});
