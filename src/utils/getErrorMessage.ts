import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

interface ValidationErrors {
  param: string,
  msg: string,
}

const getErrorValidationMessage = (
  error: FetchBaseQueryError | SerializedError | undefined,
  paramName: string,
): string => {
  if (!error) {
    return '';
  }
  // TODO: Разобраится

  // eslint-disable-next-line
  // @ts-ignore: Unreachable code error
  if (error.status !== 400) {
    return '';
  }

  // eslint-disable-next-line
  // @ts-ignore: Unreachable code error
  const { data } = error;

  if (Array.isArray(data)) {
    const findErr = data.find(({ param }: ValidationErrors) => param === paramName);

    if (findErr) {
      return findErr.msg;
    }
  }

  return '';
};

export default getErrorValidationMessage;
