import { Role } from 'Models/User';
import { selectorUser } from 'Store/user/userSelectors';
import { useAppSelector } from 'Hooks/redux';

const useIsAuth = () => {
  const {
    isLoading,
    data: { role, email },
  } = useAppSelector(selectorUser);

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

  const isAuth = !!email;

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
