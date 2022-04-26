import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useIsAuth from '../hooks/useIsAuth';
import {
  publicRoutes,
  privateRoutes,
  moderatorRoutes,
  unloginRoutes,
  RouteNames,
} from './routes';

const AppRouter = () => {
  const { isAuthOrIsLoading, isModeratorRole } = useIsAuth();

  return (
    <Routes>
      {
        privateRoutes.map(({ path, element }) => (
          <Route
            path={path}
            element={isAuthOrIsLoading ? element : <Navigate to={RouteNames.AUTH} />}
            key={path}
          />
        ))
      }
      {
        moderatorRoutes.map(({ path, element }) => (
          <Route
            path={path}
            element={isModeratorRole ? element : <Navigate to={RouteNames.PROFILE} />}
            key={path}
          />
        ))
      }
      {
        unloginRoutes.map(({ path, element }) => (
          <Route
            path={path}
            element={element}
            key={path}
          />
        ))
      }
      {
        publicRoutes.map(({ path, element }) => (
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
