import { Message } from 'Models/Message';

export interface Dialog {
  fromUserId: number,
  toUserId: number,
  message: string,
  unreadMessagesCount: number,
  createdAt: Date,
}

export interface Chat {
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
  isYouSendMessage: boolean,
}
