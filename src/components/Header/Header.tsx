import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import InputWithBtn from 'Storybook/InputWithBtn/InputWithBtn';
import IconSearch from 'Storybook/Icons/IconSearch';
import Container from 'Storybook/Container/Container';
import Button, { ButtonVariant } from 'Storybook/Button/Button';
import useIsAuth from 'Hooks/useIsAuth';
import { useAppDispatch, useAppSelector } from 'Hooks/redux';
import IconProfile, { IconProfileTypeEnum } from 'Components/IconProfile/IconProfile';
import { RouteNames } from 'Models/Route';
import { selectorUserData } from 'Store/user/userSelectors';
import { selectorInputsAdvertisementSearch } from 'Store/inputs/inputsSelector';
import { Field } from 'Store/inputs/inputsTypes';
import { inputsSlice } from 'Store/inputs/inputsSlice';
import Links from './Links/Links';
import NavBar from './NavBar/NavBar';
import logo from './static/logo.png';

import s from './Header.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const advertisementSearch = useAppSelector(selectorInputsAdvertisementSearch);
  const { image, firstName, secondName } = useAppSelector(selectorUserData);
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
    const { setChangeInput } = inputsSlice.actions;
    dispatch(setChangeInput({ field: Field.advertisementSearch, value }));
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
                    data-testid="headerAuthButton"
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
