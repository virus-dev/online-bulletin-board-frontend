import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes, RouteNames } from './routes';

const AppRouter = () => {
  const isAuth = true;
  const { pathname } = window.location;

  return (
    <Routes>
      {isAuth && (
        privateRoutes.map(({ path, element }) => (
          <Route
            path={path}
            element={element}
            key={path}
          />
        ))
      )}
      {
        publicRoutes.map(({ path, element }) => (
          <Route
            path={path}
            element={element}
            key={path}
          />
        ))
      }
      <Route path={pathname} element={<Navigate to={RouteNames.MAIN} />} />
    </Routes>
  );
};

export default AppRouter;
