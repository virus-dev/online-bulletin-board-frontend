import makeRequest, { HTTPMethods } from 'Packages/api/makeRequest';
import { UserResponseData } from './types';

export interface LoginReqData {
  email: string,
  password: string,
}

export type LoginResponse = UserResponseData;

export default (data: LoginReqData) => makeRequest<LoginResponse>({
  url: 'user/login',
  method: HTTPMethods.POST,
  data,
});
