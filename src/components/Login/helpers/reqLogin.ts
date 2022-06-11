import { AxiosError, AxiosResponse } from 'axios';
import { UserResponseData } from 'Models/User';
import makeRequest, { HTTPMethods } from 'Packages/api/makeRequest';
import { isAxiosError } from 'Utils/typeScript';

interface LoginParams {
  email: string,
  password: string,
}

export default async (
  data: LoginParams,
  onSucces: (resData: AxiosResponse<UserResponseData, unknown>) => void,
  onError: (e: AxiosError<unknown, unknown>) => void,
) => {
  try {
    const resData = await makeRequest({
      url: 'user/login',
      method: HTTPMethods.POST,
      data,
    });
    onSucces(resData);
  } catch (e) {
    if (isAxiosError(e)) {
      onError(e);
    }
  }
};
