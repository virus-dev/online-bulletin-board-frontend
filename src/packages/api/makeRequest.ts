import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';
import errorHandler from './errorHandler';

export enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export interface MakeRequestParams {
  url: string,
  method?: HTTPMethods,
  params?: object,
  data?: object,
  headers?: AxiosRequestHeaders,
  withHeaderAutorization?: boolean,
}

const makeRequest = <T>({
  url = '',
  method = HTTPMethods.GET,
  params = {},
  data = {},
  headers = {},
  withHeaderAutorization = false,
}: MakeRequestParams) => {
  const newHeaders: AxiosRequestHeaders = {
    ...headers,
    ...(withHeaderAutorization ? { authorization: `Bearer ${localStorage.getItem('JWT')}` } : {}),
  };

  const axiosReq = axios({
    url: `${process.env.REACT_APP_API_URL}${url}`,
    method,
    params,
    data,
    headers: newHeaders,
  })
    .then((res: AxiosResponse<T>) => res);

  axiosReq.catch((e) => {
    errorHandler(e);
    return e;
  });

  return axiosReq;
};

export default makeRequest;
