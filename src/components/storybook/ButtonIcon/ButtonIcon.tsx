import React, { useState } from 'react';
import IconFavorite from 'Icons/IconFavorite';
import s from './ButtonIcon.module.scss';

const ButtonIcon = () => {
  const [favorite, setFavorite] = useState(false);
  const onClickHandler = () => {
    setFavorite((prevFavorite) => !prevFavorite);
  };
  return (
    <button
      type="button"
      onClick={() => onClickHandler()}
      className={s.buttonIcon}
    >
      <p><IconFavorite size="24px" color={favorite ? 'red' : 'white'} /></p>
    </button>
  );
};

export default ButtonIcon;
