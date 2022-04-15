import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Container from '../storybook/Container/Container';
import useIsAuth from '../../hooks/useIsAuth';
import IconProfile, { IconProfileTypeEnum } from '../IconProfile/IconProfile';
import Button, { ButtonVariant } from '../storybook/Button/Button';
import InputWithBtn from '../storybook/InputWithBtn/InputWithBtn';
import IconIconMenu from '../storybook/Icons/IconIconMenu';
import IconSearch from '../storybook/Icons/IconSearch';
import Links from './Links/Links';
import NavBar from './NavBar/NavBar';
import logo from './static/logo.png';
import UserApi from '../../services/UserApi';

import s from './Header.module.scss';

const Header: React.FC = () => {
  const {
    data: { image, firstName, secondName } = {},
  } = UserApi.useGetDataQuery();
  const isAuth = useIsAuth();
  const [isHeadeFixed, setIsHeaderFixed] = useState(false);
  const [inputSearch, setInputSearch] = useState('');

  const scrollHandler = () => {
    setIsHeaderFixed(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const InputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(target.value);
  };

  return (
    <>
      <Links />
      <NavBar />
      <header className={classNames(s.header, isHeadeFixed && s.headerFixed)}>
        <Container>
          <div className={s.headerContainer}>
            <Link to="/">
              <img src={logo} alt="*" />
            </Link>
            <Button
              iconLeft={<IconIconMenu size="20px" />}
              className={s.buttonCategory}
            >
              Категории
            </Button>
            <InputWithBtn
              onChange={InputHandler}
              value={inputSearch}
              iconLeftInput={<IconSearch size="16px" />}
              variant={ButtonVariant.gray}
              fullWidth
            >
              Найти
            </InputWithBtn>
            <Button
              href="/advertisement/create"
              variant={ButtonVariant.green}
            >
              Разместить объявление
            </Button>
            {
              isAuth
                ? (
                  <IconProfile
                    image={image}
                    firstName={firstName}
                    secondName={secondName}
                    type={IconProfileTypeEnum.link}
                  />
                ) : (
                  <Button
                    variant={ButtonVariant.gray}
                    href="/auth"
                  >
                    Войти
                  </Button>
                )
            }
          </div>
        </Container>
      </header>
      <div className={classNames(isHeadeFixed && s.headerPlug)} />
    </>
  );
};

export default Header;
