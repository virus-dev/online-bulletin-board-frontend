import React, { useEffect, useRef } from 'react';
import {
  Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import useIsAuth from 'Hooks/useIsAuth';
import { RouteNames } from 'Models/Route';
import useIsMobileVersion from 'Hooks/useIsMobileVersion';
import { useAppDispatch } from 'Hooks/redux';
import { advertisementsSlice } from 'Store/advertisements/advertisementsSlice';
import {
  publicRoutes,
  privateRoutes,
  moderatorRoutes,
  unloginRoutes,
} from './routes';

const AppRouter = () => {
  const isAlreadyRender = useRef(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthOrIsLoading, isModeratorRole, isAuth } = useIsAuth();
  const isMobileVersion = useIsMobileVersion();

  useEffect(() => {
    if (isAlreadyRender.current) {
      // Срабатывает при изменении урла
      const { advertisementsClear } = advertisementsSlice.actions;
      dispatch(advertisementsClear());
    } else {
      isAlreadyRender.current = true;
    }
  }, [dispatch, location.pathname]);

  return (
    <Routes>
      {
        privateRoutes(isMobileVersion).map(({ path, element }) => (
          <Route
            path={path}
            element={isAuthOrIsLoading ? element : <Navigate to={RouteNames.AUTH} />}
            key={path}
          />
        ))
      }
      {
        moderatorRoutes(isMobileVersion).map(({ path, element }) => (
          <Route
            path={path}
            element={isModeratorRole ? element : <Navigate to={RouteNames.PROFILE} />}
            key={path}
          />
        ))
      }
      {
        unloginRoutes(isMobileVersion).map(({ path, element }) => (
          <Route
            path={path}
            element={isAuth ? <Navigate to={RouteNames.MAIN} /> : element}
            key={path}
          />
        ))
      }
      {
        publicRoutes(isMobileVersion).map(({ path, element }) => (
          <Route
            path={path}
            element={element}
            key={path}
          />
        ))
      }
      <Route path="*" element={<Navigate to={RouteNames.MAIN} />} />
    </Routes>
  );
};

export default AppRouter;
