/* eslint-disable */
import React, { Suspense as S } from 'react';
import { IRoute, RouteNames } from 'Models/Route';
import PageLoading from 'Components/PageLoading/PageLoading';

const MainPage = React.lazy(() => import('./MainPage/MainPage'));
const ProfilePage = React.lazy(() => import('./ProfilePage/ProfilePage'));
const AuthPage = React.lazy(() => import('./AuthPage/AuthPage'));
const AdvertisementCreate = React.lazy(() => import('./AdvertisementCreate/AdvertisementCreate'));
const Advertisement = React.lazy(() => import('./Advertisement/Advertisement'));
const ChatPage = React.lazy(() => import('./ChatPage/ChatPage'));
const MyAdvertisements = React.lazy(() => import('./MyAdvertisements/MyAdvertisements'));
const AdvertisementModeration = React.lazy(() => import('./AdvertisementModeration/AdvertisementModeration'));

// TODO: Нужен компонент
const fallback = <div>Loading...</div>;

export const unloginRoutes: IRoute[] = [
  { path: RouteNames.AUTH, element: <S fallback={fallback}><AuthPage /></S> },
];

export const publicRoutes: IRoute[] = [
  { path: RouteNames.MAIN, element: <S fallback={<PageLoading />}><MainPage /></S> },
  { path: RouteNames.ADVERTISEMENT_ID, element: <S fallback={fallback}><Advertisement /></S> },
];

export const moderatorRoutes: IRoute[] = [
  { path: RouteNames.ADVERTISEMENT_MODERATION, element: <S fallback={fallback}><AdvertisementModeration /></S> },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.PROFILE, element: <S fallback={fallback}><ProfilePage /></S> },
  { path: RouteNames.PROFILE_ID, element: <S fallback={fallback}><ProfilePage /></S> },
  { path: RouteNames.ADVERTISEMENT_CREATE, element: <S fallback={fallback}><AdvertisementCreate /></S> },
  { path: RouteNames.CHAT, element: <S fallback={fallback}><ChatPage /></S> },
  { path: RouteNames.ADVERTISEMENT_MY_ADVERTISEMENTS, element: <S fallback={fallback}><MyAdvertisements /></S> },
];
