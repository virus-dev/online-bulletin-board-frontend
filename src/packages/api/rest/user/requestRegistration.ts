import makeRequest, { HTTPMethods } from 'Packages/api/makeRequest';
import { UserResponseData } from './types';

export interface RegistrationReqData {
  firstName: string,
  email: string,
  password: string,
}

export type RegistrationResponse = UserResponseData;

export default (data: RegistrationReqData) => makeRequest<RegistrationResponse>({
  url: 'user/registration',
  method: HTTPMethods.POST,
  data,
});
