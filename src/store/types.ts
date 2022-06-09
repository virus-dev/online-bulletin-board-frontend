import { InitialStateAdvertisement } from './advertisement/advertisementTypes';
import { InitialStateAdvertisements } from './advertisements/advertisementsTypes';

// TODO: Блин, а надо ли это?
export enum Reducers {
  MESSAGES_REDUCER = 'messagesReducer',
}

export interface AsyncReducersInRootState {
  advertisement: InitialStateAdvertisement,
  advertisements: InitialStateAdvertisements,
}
