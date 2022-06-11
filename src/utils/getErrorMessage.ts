import { AxiosError } from 'axios';

interface ValidationErrors {
  param: string,
  msg: string,
}

const getErrorValidationMessage = (
  error: AxiosError<unknown, unknown> | null,
  paramName: string,
): string => {
  if (!error) {
    return '';
  }
  // debugger

  if (!error.response) {
    return '';
  }
  // TODO: Разобраится

  // eslint-disable-next-line
  // @ts-ignore: Unreachable code error
  if (error.response.status !== 400) {
    return '';
  }

  // eslint-disable-next-line
  // @ts-ignore: Unreachable code error
  const { data } = error.response;

  if (Array.isArray(data)) {
    const findErr = data.find(({ param }: ValidationErrors) => param === paramName);

    if (findErr) {
      return findErr.msg;
    }
  }

  return '';
};

export default getErrorValidationMessage;
