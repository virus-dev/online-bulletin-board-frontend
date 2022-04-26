import React from 'react';
import MainPage from './MainPage/MainPage';
import ProfilePage from './ProfilePage/ProfilePage';
import AuthPage from './AuthPage/AuthPage';
import AdvertisementCreate from './AdvertisementCreate/AdvertisementCreate';
import Advertisement from './Advertisement/Advertisement';
import ChatPage from './ChatPage/ChatPage';
import AdvertisementModeration from './AdvertisementModeration/AdvertisementModeration';

export interface IRoute {
  path: string;
  element: React.ReactNode;
}

export enum RouteNames {
  MAIN = '/',
  PROFILE = '/profile/',
  PROFILE_ID = '/profile/:id/', // ?
  AUTH = '/auth/',
  ADVERTISEMENT_CREATE = '/advertisement/create',
  ADVERTISEMENT_ID = '/advertisement/:advertisementId',
  CHAT = '/chat',
  ADVERTISEMENT_MODERATION = '/advertisement/moderation',
}

export const unloginRoutes: IRoute[] = [
  { path: RouteNames.AUTH, element: <AuthPage /> },
];

export const publicRoutes: IRoute[] = [
  { path: RouteNames.MAIN, element: <MainPage /> },
  { path: RouteNames.ADVERTISEMENT_ID, element: <Advertisement /> },
];

export const moderatorRoutes: IRoute[] = [
  { path: RouteNames.ADVERTISEMENT_MODERATION, element: <AdvertisementModeration /> },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.PROFILE, element: <ProfilePage /> },
  { path: RouteNames.PROFILE_ID, element: <ProfilePage /> },
  { path: RouteNames.ADVERTISEMENT_CREATE, element: <AdvertisementCreate /> },
  { path: RouteNames.CHAT, element: <ChatPage /> },
];
