import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useIsAuth from 'Hooks/useIsAuth';
import { RouteNames } from 'Models/Route';
import useIsMobileVersion from 'Hooks/useIsMobileVersion';
import {
  publicRoutes,
  privateRoutes,
  moderatorRoutes,
  unloginRoutes,
} from './routes';

const AppRouter = () => {
  const { isAuthOrIsLoading, isModeratorRole, isAuth } = useIsAuth();
  const isMobileVersion = useIsMobileVersion();

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
