import UserApi from '../services/UserApi';

const useIsAuth = () => {
  const { data, isLoading } = UserApi.useGetDataQuery();

  return isLoading || !!data?.email;
};

export default useIsAuth;
