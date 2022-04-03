import { useAppSelector } from './redux';

const useIsAuth = () => !!useAppSelector(({ user }) => user.email);

export default useIsAuth;
