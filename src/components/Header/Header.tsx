import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../storybook/Container/Container';
import Button, { ButtonVariant } from '../storybook/Button/Button';
import InputWithBtn from '../storybook/InputWithBtn/InputWithBtn';
import IconIconMenu from '../storybook/Icons/IconIconMenu';
import IconSearch from '../storybook/Icons/IconSearch';
import logo from './static/logo.png';

import s from './Header.module.scss';

const Header: React.FC = () => {
  const [inputSearch, setInputSearch] = useState('');

  const ButtonCategoryHandler = () => {};
  const ButtonSearchHandler = () => {};
  const ButtonPlaceAdHandler = () => {};
  const ButtonEnterHandler = () => {};

  const InputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(target.value);
  };

  return (
    <header className={s.header}>
      <Container>
        <div className={s.headerContainer}>
          <Link to="/">
            <img src={logo} alt="*" />
          </Link>
          <Button
            onClick={ButtonCategoryHandler}
            iconLeft={<IconIconMenu size="20px" />}
            className={s.buttonCategory}
          >
            Категории
          </Button>
          <InputWithBtn
            onChange={InputHandler}
            onClick={() => ButtonSearchHandler}
            value={inputSearch}
            iconLeftInput={<IconSearch size="16px" />}
            variant={ButtonVariant.gray}
            fullWidth
          >
            Найти
          </InputWithBtn>
          <Button
            onClick={ButtonPlaceAdHandler}
            variant={ButtonVariant.green}
          >
            Разместить объявление
          </Button>
          <Button
            onClick={ButtonEnterHandler}
            variant={ButtonVariant.gray}
          >
            Войти
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
