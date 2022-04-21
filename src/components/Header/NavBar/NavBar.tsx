import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../storybook/Container/Container';
import IconGpsArrow from '../../storybook/Icons/GpsArrow';
import IconFavorites from '../../storybook/Icons/Favorites';
import SocketContext from '../../../context/SocketContext';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getCountUnreadMessages } from '../../../store/actionCreators/messagesActionCreators';

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
          <Link to="/chat" className={s.navBarItem}>
            <p className={s.navBarItemText}>
              Непрочитанных сообщений:
              {' '}
              {unreadMessages}
            </p>
          </Link>
          <div className={s.navBarItem}>
            <IconFavorites size="16px" color="#333" />
            <p className={s.navBarItemText}>Избранное</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
