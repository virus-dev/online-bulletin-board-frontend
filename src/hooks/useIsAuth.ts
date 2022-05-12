import UserAPI from 'Services/UserAPI';
import { Role } from 'Models/User';

const useIsAuth = () => {
  const { data: { email, role } = {}, isLoading } = UserAPI.useGetDataQuery();

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
