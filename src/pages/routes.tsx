import React from 'react';
import MainPage from './MainPage/MainPage';
import ProfilePage from './ProfilePage/ProfilePage';
import AuthPage from './AuthPage/AuthPage';

export interface IRoute {
  path: string;
  element: React.ReactNode;
}

export enum RouteNames {
  MAIN = '/',
  PROFILE = '/profile/',
  PROFILE_ID = '/profile/:id/',
  AUTH = '/auth/',
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.MAIN, element: <MainPage /> },
  { path: RouteNames.AUTH, element: <AuthPage /> },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.PROFILE, element: <ProfilePage /> },
  { path: RouteNames.PROFILE_ID, element: <ProfilePage /> },
];
