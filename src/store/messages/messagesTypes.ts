import { Message } from 'Models/Message';
import { User } from 'Models/User';

export interface Dialog {
  fromUserId: number,
  toUserId: number,
  message: string,
  unreadMessagesCount: number,
  createdAt: Date,
  user: User,
}

export interface Chat {
  user: User,
  chatWithUserId: number | null,
  messages: Message[] | [],
  isLoading: boolean,
}

export interface Dialogs {
  data: Dialog[],
  isLoading: boolean,
}

export interface InitialStateMessages {
  unreadMessagesCount: number,
  dialogs: Dialogs,
  chat: Chat,
}

export interface UpdateDialogAction {
  message: Message,
  unreadMessagesCount: number,
  user: User,
}
