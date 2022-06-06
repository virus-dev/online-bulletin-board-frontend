/* eslint-disable */
import React, { Suspense as S } from 'react';
import { IRoute, RouteNames } from 'Models/Route';
import PageLoading from 'Components/PageLoading/PageLoading';

const PageMainDesktop = React.lazy(() => import('./PageMain/desktop/PageMain'));
const PageMainMobile = React.lazy(() => import('./PageMain/mobile/PageMain'));
const PageAdvertisementDesktop = React.lazy(() => import('./PageAdvertisement/desktop/PageAdvertisement'));
const PageAdvertisementMobile = React.lazy(() => import('./PageAdvertisement/mobile/PageAdvertisement'));
const PageProfileDesktop = React.lazy(() => import('./PageProfile/desktop/PageProfile'));
const PageProfileMobile = React.lazy(() => import('./PageProfile/mobile/PageProfile'));
const PageAdvertisementCreateDesktop = React.lazy(() => import('./PageAdvertisementCreate/desktop/PageAdvertisementCreate'));
const PageAdvertisementCreateMobile = React.lazy(() => import('./PageAdvertisementCreate/mobile/PageAdvertisementCreate'));
const PageChatDesktop = React.lazy(() => import('./PageChat/desktop/PageChat'));
const PageChatMobile = React.lazy(() => import('./PageChat/mobile/PageChat'));
const PageAuthDesktop = React.lazy(() => import('./PageAuth/desktop/PageAuth'));
const PageAuthMobile = React.lazy(() => import('./PageAuth/mobile/PageAuth'));
const PageMyAdvertisementsDesktop = React.lazy(() => import('./PageMyAdvertisements/desktop/PageMyAdvertisements'));
const PageMyAdvertisementsMobile = React.lazy(() => import('./PageMyAdvertisements/mobile/PageMyAdvertisements'));
const PageAdvertisementModerationDesktop = React.lazy(() => import('./PageAdvertisementModeration/desktop/PageAdvertisementModeration'));
const PageAdvertisementModerationMobile = React.lazy(() => import('./PageAdvertisementModeration/mobile/PageAdvertisementModeration'));
const PageAdvertisementsViewedDesktop = React.lazy(() => import('./PageAdvertisementsViewed/desktop/PageAdvertisementsViewed'));
const PageAdvertisementsViewedMobile = React.lazy(() => import('./PageAdvertisementsViewed/mobile/PageAdvertisementsViewed'));

// const getPage = (pageName: string, isMobile: boolean) => ({
//   Component: React.lazy(() => import(`./${pageName}/${isMobile ? 'mobile' : 'desktop'}/${pageName}`)),
//   reducers: require(`./${pageName}/${isMobile ? 'mobile' : 'desktop'}/reducers`).default,
// })

// console.log(getPage('PageMain', false));

type ElementComponentProps = {
  Component: React.LazyExoticComponent<() => JSX.Element>,
  withoutHeader?: boolean,
}

const ElementComponent: React.FC<ElementComponentProps> = ({ Component, withoutHeader }) => (
  <S fallback={<PageLoading withoutHeader={!!withoutHeader} />}>
    <Component />
  </S>
);

type RouteFunction = (isMobile: boolean) => IRoute[];

export const unloginRoutes: RouteFunction = (isMobile) => ([
  { path: RouteNames.AUTH, element: <ElementComponent withoutHeader Component={isMobile ? PageAuthMobile : PageAuthDesktop} /> },
]);

export const publicRoutes: RouteFunction = (isMobile) => ([
  { path: RouteNames.MAIN, element: <ElementComponent Component={isMobile ? PageMainMobile : PageMainDesktop} /> },
  { path: RouteNames.ADVERTISEMENT_ID, element: <ElementComponent Component={isMobile ? PageAdvertisementMobile : PageAdvertisementDesktop} /> },
  { path: RouteNames.ADVERTISEMENT_VIEWED, element: <ElementComponent Component={isMobile ? PageAdvertisementsViewedMobile : PageAdvertisementsViewedDesktop} /> },
]);

export const moderatorRoutes: RouteFunction = (isMobile) => ([
  { path: RouteNames.ADVERTISEMENT_MODERATION, element: <ElementComponent Component={isMobile ? PageAdvertisementModerationMobile : PageAdvertisementModerationDesktop} /> },
]);

export const privateRoutes: RouteFunction = (isMobile) => ([
  { path: RouteNames.PROFILE, element: <ElementComponent Component={isMobile ? PageProfileMobile : PageProfileDesktop} /> },
  { path: RouteNames.PROFILE_ID, element: <ElementComponent Component={isMobile ? PageProfileMobile : PageProfileDesktop} /> },
  { path: RouteNames.ADVERTISEMENT_CREATE, element: <ElementComponent Component={isMobile ? PageAdvertisementCreateMobile : PageAdvertisementCreateDesktop} /> },
  { path: RouteNames.CHAT, element: <ElementComponent Component={isMobile ? PageChatMobile : PageChatDesktop} /> },
  { path: RouteNames.ADVERTISEMENT_MY_ADVERTISEMENTS, element: <ElementComponent Component={isMobile ? PageMyAdvertisementsMobile : PageMyAdvertisementsDesktop} /> },
]);
