import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../models/Message';
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
}

interface InitialStateMessages {
  unreadMessages: number,
  dialogs: Dialog[],
  chat: Chat,
}

const initialState: InitialStateMessages = {
  unreadMessages: 0,
  dialogs: [],
  chat: {
    chatWithUserId: null,
    messages: [],
  },
};

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
    updateDialog(state, action: PayloadAction<Message>) {
      const newStateDialogs: Message[] = JSON.parse(JSON.stringify(state.dialogs));

      const dialogIndex = newStateDialogs.findIndex((dialog) => (
        action.payload.fromUserId === dialog.fromUserId
        && action.payload.toUserId === dialog.toUserId)
        || (action.payload.toUserId === dialog.fromUserId
        && action.payload.fromUserId === dialog.toUserId
        ));

      newStateDialogs.splice(dialogIndex, 1);

      // TODO: Не понимаю в чем ошибка
      state.dialogs = [
        // eslint-disable-next-line
        // @ts-ignore: Unreachable code error
        {
          ...action.payload,
          unreadMessagesCount: 0,
        },
        // eslint-disable-next-line
        // @ts-ignore: Unreachable code error
        ...newStateDialogs,
      ];

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
  },
  extraReducers: {
    // TODO: Может лучше fetch?
    [getCountUnreadMessages.fulfilled.type]: (state, action: PayloadAction<number>) => {
      state.unreadMessages = action.payload;
    },
    [getDialogs.fulfilled.type]: (state, action: PayloadAction<Dialog[]>) => {
      state.dialogs = action.payload;
    },
    [getChat.fulfilled.type]: (state, action: PayloadAction<Message[]>) => {
      state.chat.messages = action.payload;
    },
  },
});

export default messagesSlice.reducer;
