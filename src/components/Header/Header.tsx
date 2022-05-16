import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import InputWithBtn from 'Storybook/InputWithBtn/InputWithBtn';
import IconSearch from 'Storybook/Icons/IconSearch';
import Container from 'Storybook/Container/Container';
import Button, { ButtonVariant } from 'Storybook/Button/Button';
import useIsAuth from 'Hooks/useIsAuth';
import UserAPI from 'Services/UserAPI';
import { useAppDispatch, useAppSelector } from 'Hooks/redux';
import { inputsSlice, Field } from 'Store/reducers/inputsSlice';
import IconProfile, { IconProfileTypeEnum } from 'Components/IconProfile/IconProfile';
import { RouteNames } from 'Models/Route';
import Links from './Links/Links';
import NavBar from './NavBar/NavBar';
import logo from './static/logo.png';

import s from './Header.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const advertisementSearch = useAppSelector(({ inputs }) => inputs.inputs.advertisementSearch);
  const {
    data: { image, firstName, secondName } = {},
  } = UserAPI.useGetDataQuery();
  const { isAuth } = useIsAuth();
  const [isHeadeFixed, setIsHeaderFixed] = useState(false);

  const scrollHandler = () => {
    setIsHeaderFixed(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const InputHandler = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(inputsSlice.actions.setChangeInput({ field: Field.advertisementSearch, value }));
  };

  const onClickButtonHandler = () => {
    navigate(RouteNames.MAIN);
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
            {/* <Button
              iconLeft={<IconIconMenu size="20px" />}
              className={s.buttonCategory}
            >
              Категории
            </Button> */}
            <InputWithBtn
              onChange={InputHandler}
              value={advertisementSearch}
              iconLeftInput={<IconSearch size="16px" />}
              variant={ButtonVariant.gray}
              name="search"
              fullWidth
              onClick={onClickButtonHandler}
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
