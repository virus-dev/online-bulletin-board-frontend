import React from 'react';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import Dialogs from '../../components/Dialogs/Dialogs';
import Header from '../../components/Header/Header';
import Container from '../../components/storybook/Container/Container';
import { messagesSlice } from '../../store/reducers/messagesSlice';

import s from './ChatPage.module.scss';

const ChatPage = () => (
  <>
    <Header />
    <Container className={s.chatWrapper}>
      <Dialogs />
      <ChatWindow />
    </Container>
  </>
);

export default ChatPage;
