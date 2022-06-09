interface ResponseValidateError {
  msg: string,
  param: string,
}

export type ErrorType = {
  data: ResponseValidateError[] | undefined,
  status: number | undefined,
};
