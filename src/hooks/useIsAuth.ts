import UserApi from '../services/UserApi';
import { Role } from '../models/User';

const useIsAuth = () => {
  const { data: { email, role } = {}, isLoading } = UserApi.useGetDataQuery();

  if (!localStorage.getItem('JWT')) {
    return {
      isAuth: false,
      isLoading: false,
      isAuthOrIsLoading: false,
      isAdminRole: false,
      isModeratorRole: false,
      isUserRole: false,
    };
  }

  const isAuth = email;

  const isAdminRole = isLoading || Role.ADMIN === role;
  const isModeratorRole = isLoading || Role.MODERATOR === role || isAdminRole;
  const isUserRole = isLoading || Role.USER === role || isModeratorRole || isAdminRole;

  return {
    isAuth,
    isLoading,
    isAuthOrIsLoading: isAuth || isLoading,
    isAdminRole,
    isModeratorRole,
    isUserRole,
  };
};

export default useIsAuth;
