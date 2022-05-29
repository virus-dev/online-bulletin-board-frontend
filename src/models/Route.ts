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
  ADVERTISEMENT_MY_ADVERTISEMENTS = '/advertisement/my_advertisements',
  ADVERTISEMENT_VIEWED = '/advertisement_viewed',
}
