import Price from 'Components/Price/Price';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import IconNoFoto from 'Storybook/Icons/IconNoFoto';
import ButtonIcon from 'Storybook/ButtonIcon/ButtonIcon';
import IconFavorite from 'Icons/IconFavorite';
import isProduction from 'Utils/isProduction';

import s from './AdvertisementItem.module.scss';

interface AdvertisementItemProps {
  id: number,
  title: string,
  price: number,
  advertisementImages: string[],
}

const AdvertisementItem: React.FC<AdvertisementItemProps> = ({
  id,
  price,
  title,
  advertisementImages,
}) => {
  const [buttonIconActive, setButtonIconActive] = useState(false);

  const onClickHandler = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setButtonIconActive((prevState) => !prevState);
    e.preventDefault();
  };
  return (
    <Link
      type="button"
      className={s.advertisementItem}
      to={`/advertisement/${id}`}
      data-testid="advertisementItem"
    >
      <div className={s.advertisementItemImg}>
        <div>
          {advertisementImages?.length ? (
            <img src={advertisementImages[0]} alt="*" />
          ) : (
            <IconNoFoto size="100px" />
          )}
        </div>
        {
          !isProduction() && (
            <div className={s.advertisementItemFavorite}>
              <ButtonIcon
                onClick={onClickHandler}
                icon={<IconFavorite color={buttonIconActive ? 'red' : 'white'} />}
              />
            </div>
          )
        }
      </div>
      <div className={s.advertisementItemInfo}>
        <Price price={price} />
        <div className={s.title}>{title}</div>
      </div>
    </Link>
  );
};

export default AdvertisementItem;
