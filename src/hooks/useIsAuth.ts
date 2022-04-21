import UserApi from '../services/UserApi';

const useIsAuth = () => {
  const { data, isLoading } = UserApi.useGetDataQuery();

  const isAuth = !!data?.email;

  return {
    isAuth,
    isLoading,
    isAuthOrIsLoading: isAuth || isLoading,
  };
};

export default useIsAuth;
