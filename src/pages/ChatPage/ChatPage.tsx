import React from 'react';
import ChatWindow from 'Components/ChatWindow/ChatWindow';
import Dialogs from 'Components/Dialogs/Dialogs';
import Header from 'Components/Header/Header';
import Container from 'Components/storybook/Container/Container';

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
