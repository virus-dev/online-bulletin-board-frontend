import React from 'react';
import Container from '../../storybook/Container/Container';
import IconGpsArrow from '../../storybook/Icons/GpsArrow';
import IconFavorites from '../../storybook/Icons/Favorites';

import s from './NavBar.module.scss';

const NavBar: React.FC = () => (
  <div className={s.navBar}>
    <Container className={s.navBarContainer}>
      <div className={s.navBarLocation}>
        <p>Местоположение:</p>
        <p><IconGpsArrow size="16px" color="#333" /></p>
        <p className={s.location}>Земля</p>
      </div>
      <div>
        <div className={s.navBarItem}>
          <IconFavorites size="16px" color="#333" />
          <p className={s.navBarItemText}>Избранное</p>
        </div>
      </div>
    </Container>
  </div>
);

export default NavBar;
