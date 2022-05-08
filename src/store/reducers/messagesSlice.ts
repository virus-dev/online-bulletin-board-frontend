import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, Status } from '../../models/Message';
import { ReadMessageResponse } from '../../models/WebSocket';
import getStateCopy from '../../utils/getStateCopy';
import { getCountUnreadMessages, getDialogs, getChat } from '../actionCreators/messagesActionCreators';

interface Dialog {
  fromUserId: number,
  toUserId: number,
  message: string,
  unreadMessagesCount: number,
  createdAt: Date,
}

interface Chat {
  chatWithUserId: number | null,
  messages: Message[] | [],
  isLoading: boolean,
}

interface Dialogs {
  data: Dialog[],
  isLoading: boolean,
}

interface InitialStateMessages {
  unreadMessages: number,
  dialogs: Dialogs,
  chat: Chat,
}

interface UpdateDialogAction {
  message: Message,
  isYouSendMessage: boolean,
}

const initialState: InitialStateMessages = {
  unreadMessages: 0,
  dialogs: {
    data: [],
    isLoading: false,
  },
  chat: {
    chatWithUserId: null,
    messages: [],
    isLoading: false,
  },
};

const getNewMessages = (messages: Message[], id: number, fromUserId: number, toUserId: number) => (
  // TODO: Тут нужно будет оптимизировать
  // Меняем статус сообщения. С "delivered" на "read"
  messages.map((el) => {
    if (id === el.id && fromUserId === el.fromUserId && toUserId === el.toUserId) {
      return { ...el, status: Status.read };
    }
    return el;
  })
);

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setChatWithUserId(state, action: PayloadAction<number>) {
      state.chat.chatWithUserId = action.payload;
    },
    pushMessage(state, action: PayloadAction<Message>) {
      state.chat.messages = [...state.chat.messages, action.payload];
    },
    updateDialog(
      state,
      { payload: { isYouSendMessage, message } }: PayloadAction<UpdateDialogAction>,
    ) {
      const {
        dialogs: { data: newStateDialogs },
        unreadMessages,
      }: InitialStateMessages = getStateCopy(state);

      const dialogIndex = newStateDialogs.findIndex((dialog) => (
        message.fromUserId === dialog.fromUserId
        && message.toUserId === dialog.toUserId)
        || (message.toUserId === dialog.fromUserId
        && message.fromUserId === dialog.toUserId
        ));

      newStateDialogs.splice(dialogIndex, 1);

      // TODO: Не понимаю в чем ошибка
      state.dialogs.data = [
        // eslint-disable-next-line
        // @ts-ignore: Unreachable code error
        {
          ...message,
          unreadMessagesCount: isYouSendMessage ? 0 : unreadMessages + 1,
        },
        // eslint-disable-next-line
        // @ts-ignore: Unreachable code error
        ...newStateDialogs,
      ];

      // TODO: Что это? Удалить? Не, пока оставим
      // state.dialogs = JSON.parse(JSON.stringify(state.dialogs)).map((dialog: Message) => {
      //   if (
      //     (action.payload.fromUserId === dialog.fromUserId
      //     && action.payload.toUserId === dialog.toUserId)
      //     || (action.payload.toUserId === dialog.fromUserId
      //     && action.payload.fromUserId === dialog.toUserId)
      //   ) {
      //     return {
      //       ...action.payload,
      //       unreadMessagesCount: 0,
      //     };
      //   }

      //   return dialog;
      // });
    },
    youReadedMessage: (
      state,
      { payload: { fromUserId, id, toUserId } }: PayloadAction<ReadMessageResponse>,
    ) => {
      const {
        chat: { messages },
        dialogs: { data: dataDialogs },
        unreadMessages,
      }: InitialStateMessages = getStateCopy(state);

      state.chat.messages = getNewMessages(messages, id, fromUserId, toUserId);

      // Обновляем кол-во непрочитанных сообщений в диалоге
      const newDialogs = dataDialogs.map((dialog) => {
        if (
          (dialog.fromUserId === fromUserId && dialog.toUserId === toUserId)
          || (dialog.fromUserId === toUserId && dialog.toUserId === fromUserId)
        ) {
          return { ...dialog, unreadMessagesCount: dialog.unreadMessagesCount - 1 };
        }
        return dialog;
      });
      state.dialogs.data = newDialogs;

      // Обновляем кол-во всех непрочитанных сообщений
      state.unreadMessages = unreadMessages - 1;
    },
    yourMessageWasRead: (
      state,
      { payload: { fromUserId, id, toUserId } }: PayloadAction<ReadMessageResponse>,
    ) => {
      const {
        chat: { messages },
      }: InitialStateMessages = getStateCopy(state);

      state.chat.messages = getNewMessages(messages, id, fromUserId, toUserId);
    },
  },
  extraReducers: {
    // TODO: Может лучше fetch?
    [getCountUnreadMessages.fulfilled.type]: (state, action: PayloadAction<number>) => {
      state.unreadMessages = action.payload;
    },
    [getDialogs.fulfilled.type]: (state, action: PayloadAction<Dialog[]>) => {
      state.dialogs.data = action.payload;
      state.dialogs.isLoading = false;
    },
    [getDialogs.rejected.type]: (state) => {
      state.dialogs.isLoading = false;
    },
    [getDialogs.pending.type]: (state) => {
      state.dialogs.isLoading = true;
    },
    // getChat
    [getChat.fulfilled.type]: (state, action: PayloadAction<Message[]>) => {
      state.chat.messages = action.payload;
      state.chat.isLoading = false;
    },
    [getChat.pending.type]: (state) => {
      state.chat.isLoading = true;
    },
    [getChat.rejected.type]: (state) => {
      state.chat.isLoading = false;
    },
  },
});

export default messagesSlice.reducer;
