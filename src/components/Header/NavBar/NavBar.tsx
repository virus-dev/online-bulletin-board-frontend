import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'Storybook/Container/Container';
import IconGpsArrow from 'Storybook/Icons/IconGpsArrow';
import IconMessage from 'Storybook/Icons/IconMessage';
import IconEye from 'Storybook/Icons/IconEye';
import SocketContext from 'Context/SocketContext';
import { useAppDispatch, useAppSelector } from 'Hooks/redux';
import { fetchCountUnreadMessages } from 'Store/messages/messagesAsyncActions';
import { RouteNames } from 'Models/Route';
import { selectorMessagesUnreadMessagesCount } from 'Store/messages/messagesSelectors';

import s from './NavBar.module.scss';

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useContext(SocketContext);
  const unreadMessagesCount = useAppSelector(selectorMessagesUnreadMessagesCount);

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchCountUnreadMessages());
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
          <div className={s.navBarItem}>
            <IconEye color="#333" size="16px" />
            <Link to={RouteNames.ADVERTISEMENT_VIEWED}>
              <p className={s.navBarItemText}>
                Просмотренные
              </p>
            </Link>
          </div>
          <div className={s.navBarItem}>
            <IconMessage color="#333" size="16px" />
            <Link to={RouteNames.CHAT}>
              <p className={s.navBarItemText}>
                Непрочитанных сообщений:
                {' '}
                {unreadMessagesCount}
              </p>
            </Link>
          </div>
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
