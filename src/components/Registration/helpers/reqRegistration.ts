import { AxiosError, AxiosResponse } from 'axios';
import { UserResponseData } from 'Models/User';
import makeRequest, { HTTPMethods } from 'Packages/api/makeRequest';
import { isAxiosError } from 'Utils/typeScript';

interface RegistrationsParams {
  firstName: string,
  email: string,
  password: string,
}

export default async (
  data: RegistrationsParams,
  onSucces: (resData: AxiosResponse<UserResponseData, unknown>) => void,
  onError: (e: AxiosError<unknown, unknown>) => void,
) => {
  try {
    const resData = await makeRequest({
      url: 'user/registration',
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
