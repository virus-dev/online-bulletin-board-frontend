import { isAxiosError } from 'Utils/typeScript';

export default (e: unknown) => {
  if (isAxiosError(e)) {
    if (e.response?.status === 401) {
      localStorage.removeItem('JWT');
    }
  }
};
