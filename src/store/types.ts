import { InitialStateMessages } from './messages/messagesTypes';

// TODO: Блин, а надо ли это?
export enum Reducers {
  MESSAGES_REDUCER = 'messagesReducer',
}

export interface AsyncReducersInRootState {
  messages: InitialStateMessages,
}
