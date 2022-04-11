import React from 'react';
import MainPage from './MainPage/MainPage';
import ProfilePage from './ProfilePage/ProfilePage';
import AuthPage from './AuthPage/AuthPage';
import AdvertisementCreate from './AdvertisementCreate/AdvertisementCreate';

export interface IRoute {
  path: string;
  element: React.ReactNode;
}

export enum RouteNames {
  MAIN = '/',
  PROFILE = '/profile/',
  PROFILE_ID = '/profile/:id/',
  AUTH = '/auth/',
  ADVERTISEMENT_CREATE = '/advertisement/create',
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.MAIN, element: <MainPage /> },
  { path: RouteNames.AUTH, element: <AuthPage /> },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.PROFILE, element: <ProfilePage /> },
  { path: RouteNames.PROFILE_ID, element: <ProfilePage /> },
  { path: RouteNames.ADVERTISEMENT_CREATE, element: <AdvertisementCreate /> },
];
