import axios, { AxiosRequestHeaders } from 'axios';

export enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

interface MakeRequestParams {
  url: string,
  method?: HTTPMethods,
  params?: object,
  data?: object,
  headers?: AxiosRequestHeaders,
}

export default ({
  url = '',
  method = HTTPMethods.GET,
  params = {},
  data = {},
  headers = {},
}: MakeRequestParams) => axios({
  url: `${process.env.REACT_APP_API_URL}${url}`,
  method,
  params,
  data,
  headers,
});
