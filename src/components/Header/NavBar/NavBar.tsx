import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'Storybook/Container/Container';
import IconGpsArrow from 'Storybook/Icons/IconGpsArrow';
import IconMessage from 'Storybook/Icons/IconMessage';
import SocketContext from 'Context/SocketContext';
import { useAppDispatch, useAppSelector } from 'Hooks/redux';
import { getCountUnreadMessages } from 'Store/actionCreators/messagesActionCreators';

import s from './NavBar.module.scss';

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useContext(SocketContext);
  const unreadMessages = useAppSelector(({ messages }) => messages.unreadMessages);

  useEffect(() => {
    if (isConnected) {
      dispatch(getCountUnreadMessages());
    }
  }, [dispatch, isConnected]);

  return (
    <div className={s.navBar}>
      <Container className={s.navBarContainer}>
        <div className={s.navBarLocation}>
          <p>Местоположение:</p>
          <p><IconGpsArrow size="16px" color="#333" /></p>
          <p className={s.location}>Земля</p>
        </div>
        <div className={s.navBarItems}>
          <IconMessage color="#333" size="16px" />
          <Link to="/chat" className={s.navBarItem}>
            <p className={s.navBarItemText}>
              Непрочитанных сообщений:
              {' '}
              {unreadMessages}
            </p>
          </Link>
          {/* <div className={s.navBarItem}>
            <IconFavorites size="16px" color="#333" />
            <p className={s.navBarItemText}>Избранное</p>
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
