import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { isAxiosError } from 'Utils/typeScript';

export type OnSuccesParams<Response> = AxiosResponse<Response, unknown>;
export type OnErrorFunc = (e: unknown) => void;

interface UseCreateRequestParams<Response, ReqData> {
  restReq: (data?: ReqData) => Promise<AxiosResponse<Response, unknown>>,
  onSucces?: (data: OnSuccesParams<Response>) => void,
  onError?: (e: unknown) => void,
}

export const useCreateRequest = <Response, ReqData>({
  restReq,
  onSucces,
  onError,
}: UseCreateRequestParams<Response, ReqData>) => {
  const [resData, setResData] = useState<AxiosResponse<Response, unknown> | null>(null);
  const [error, setError] = useState<AxiosError<unknown, unknown> | null>(null);
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getErrorText = (e: AxiosError<unknown, unknown>) => {
    if (e && e.response?.status && e.response?.status !== 400) {
      const newErrorText = typeof e.response?.data === 'string' && e.response?.headers['content-type'] === 'application/json; charset=utf-8' ? e.response?.data : 'Неизвестая ошибка';
      setErrorText(newErrorText);
    } else {
      setErrorText('');
    }
  };

  const fetchReq = async (dataReq?: ReqData) => {
    try {
      setIsLoading(true);
      const dataRes = await restReq(dataReq);
      setResData(dataRes);
      setIsLoading(false);
      onSucces?.(dataRes);
    } catch (e) {
      setIsLoading(false);
      if (isAxiosError(e)) {
        setError(e);
        onError?.(e);
        getErrorText(e);
      }
    }
  };

  return {
    resData,
    error,
    errorText,
    isLoading,
    fetchReq,
  };
};

export default useCreateRequest;
