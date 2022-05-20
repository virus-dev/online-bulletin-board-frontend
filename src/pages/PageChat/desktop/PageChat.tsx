import React from 'react';
import ChatWindow from 'Components/ChatWindow/ChatWindow';
import Dialogs from 'Components/Dialogs/Dialogs';
import Header from 'Components/Header/Header';
import Container from 'Storybook/Container/Container';

import s from './PageChat.module.scss';

const PageChat = () => (
  <>
    <Header />
    <Container className={s.chatWrapper}>
      <Dialogs />
      <ChatWindow />
    </Container>
  </>
);

export default PageChat;
