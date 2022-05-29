import Price from 'Components/Price/Price';
import Loader from 'Components/storybook/Loader/Loader';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import AdvertisementAPI from 'Services/AdvertisementAPI';
import IconNoFoto from 'Storybook/Icons/IconNoFoto';
import ButtonIcon from 'Storybook/ButtonIcon/ButtonIcon';
import IconFavorite from 'Icons/IconFavorite';
import isProduction from 'Utils/isProduction';

import s from './AdvertisementItem.module.scss';

interface AdvertisementItemProps {
  id: number,
  title: string,
  price: number,
}

const AdvertisementItem: React.FC<AdvertisementItemProps> = ({ id, price, title }) => {
  const { data, isLoading } = AdvertisementAPI.useGetImagesQuery(id);
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
    >
      <div className={s.advertisementItemImg}>
        {isLoading ? <div><Loader /></div> : (
          <div>
            {data?.length ? (
              <img src={data[0]} alt="*" />
            ) : (
              <IconNoFoto size="100px" />
            )}
          </div>
        )}
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
