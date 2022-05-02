import React from 'react';
import MainPage from './MainPage/MainPage';
import ProfilePage from './ProfilePage/ProfilePage';
import AuthPage from './AuthPage/AuthPage';
import AdvertisementCreate from './AdvertisementCreate/AdvertisementCreate';
import Advertisement from './Advertisement/Advertisement';
import ChatPage from './ChatPage/ChatPage';
import MyAdvertisements from './MyAdvertisements/MyAdvertisements';
import AdvertisementModeration from './AdvertisementModeration/AdvertisementModeration';
import { IRoute, RouteNames } from '../models/Route';

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
  { path: RouteNames.ADVERTISEMENT_MY_ADVERTISEMENTS, element: <MyAdvertisements /> },
];
