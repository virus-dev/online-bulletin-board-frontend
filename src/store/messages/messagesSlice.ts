import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, Status } from 'Models/Message';
import { ReadMessageResponse } from 'Models/WebSocket';
import { Reducers } from 'Store/types';
import getStateCopy from 'Utils/getStateCopy';
import { fetchCountUnreadMessages, fetchDialogs, fetchChat } from './messagesAsyncActions';
import { InitialStateMessages, UpdateDialogAction, Dialog } from './messagesTypes';

const initialState: InitialStateMessages = {
  unreadMessagesCount: 0,
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
  name: Reducers.MESSAGES_REDUCER,
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
        unreadMessagesCount,
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
          unreadMessagesCount: isYouSendMessage ? 0 : unreadMessagesCount + 1,
        },
        // eslint-disable-next-line
        // @ts-ignore: Unreachable code error
        ...newStateDialogs,
      ];

      // TODO: 1. Что это? Удалить?
      // TODO: 2. Не, пока оставим
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
        unreadMessagesCount,
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
      state.unreadMessagesCount = unreadMessagesCount - 1;
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
    [fetchCountUnreadMessages.fulfilled.type]: (state, action: PayloadAction<number>) => {
      state.unreadMessagesCount = action.payload;
    },
    [fetchDialogs.fulfilled.type]: (state, action: PayloadAction<Dialog[]>) => {
      state.dialogs.data = action.payload;
      state.dialogs.isLoading = false;
    },
    [fetchDialogs.rejected.type]: (state) => {
      state.dialogs.isLoading = false;
    },
    [fetchDialogs.pending.type]: (state) => {
      state.dialogs.isLoading = true;
    },
    [fetchChat.fulfilled.type]: (state, action: PayloadAction<Message[]>) => {
      state.chat.messages = action.payload;
      state.chat.isLoading = false;
    },
    [fetchChat.pending.type]: (state) => {
      state.chat.isLoading = true;
    },
    [fetchChat.rejected.type]: (state) => {
      state.chat.isLoading = false;
    },
  },
});

export default messagesSlice.reducer;
