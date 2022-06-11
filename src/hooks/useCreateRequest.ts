import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { isAxiosError } from 'Utils/typeScript';

export type OnSuccesParams<P> = AxiosResponse<P, unknown>;
export type OnErrorFunc = (e: unknown) => void;

interface UseCreateRequestParams<D, B> {
  restReq: (data?: B) => Promise<AxiosResponse<D, unknown>>,
  onSucces?: (data: OnSuccesParams<D>) => void,
  onError?: (e: unknown) => void,
}

export const useCreateRequest = <T, B>({
  restReq,
  onSucces,
  onError,
}: UseCreateRequestParams<T, B>) => {
  const [resData, setResData] = useState<AxiosResponse<T, unknown> | null>(null);
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

  const func = async (dataReq?: B) => {
    try {
      setIsLoading(true);
      const dataRes = await restReq(dataReq as B);
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
    func,
  };
};

export default useCreateRequest;
