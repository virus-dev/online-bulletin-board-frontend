import axios from 'axios';
import { ErrorType } from 'Models/ResponseValidateError';
import { isAxiosError } from 'Utils/typeScript';

export default async (
  formData: FormData,
  onSucces: () => void,
  onError: (error: ErrorType) => void,
) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}advertisement/create`, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
      },
    });
    onSucces();
  } catch (e) {
    if (isAxiosError(e)) {
      onError({
        data: e.response?.data,
        status: e.response?.status,
      });
    }
  }
};
