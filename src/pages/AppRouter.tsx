import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useIsAuth from '../hooks/useIsAuth';
import { RouteNames } from '../models/Route';
import {
  publicRoutes,
  privateRoutes,
  moderatorRoutes,
  unloginRoutes,
} from './routes';

const AppRouter = () => {
  const { isAuthOrIsLoading, isModeratorRole, isAuth } = useIsAuth();

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
            element={isAuth ? <Navigate to={RouteNames.MAIN} /> : element}
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
