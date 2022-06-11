/* eslint max-len: ["off"] */

interface ResponseValidateError {
  msg: string,
  param: string,
}

export type ErrorType = {
  data: ResponseValidateError[] | undefined,
  status: number | undefined,
};

// eslint-disable-next-line
// @ts-ignore: Unreachable code error
export const isResponseValidateError = (x): x is ResponseValidateError => (x.ResponseValidateError === true);
