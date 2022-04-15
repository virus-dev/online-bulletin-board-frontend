import React, { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useIsAuth from '../hooks/useIsAuth';
import {
  publicRoutes,
  privateRoutes,
  unloginRoutes,
  RouteNames,
} from './routes';

const AppRouter = () => {
  const isAuth = useIsAuth();

  return (
    <Routes>
      {
        privateRoutes.map(({ path, element }) => (
          <Route
            path={path}
            element={isAuth ? element : <Navigate to={RouteNames.AUTH} />}
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
