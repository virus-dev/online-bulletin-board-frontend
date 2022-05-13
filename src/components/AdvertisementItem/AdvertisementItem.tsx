import Price from 'Components/Price/Price';
import Loader from 'Components/storybook/Loader/Loader';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdvertisementAPI from 'Services/AdvertisementAPI';
import IconNoFoto from 'Storybook/Icons/IconNoFoto';

import s from './AdvertisementItem.module.scss';

interface AdvertisementItemProps {
  id: number,
  title: string,
  price: number,
}

const AdvertisementItem: React.FC<AdvertisementItemProps> = ({ id, price, title }) => {
  const navigate = useNavigate();
  const { data, isLoading } = AdvertisementAPI.useGetImagesQuery(id);

  const onClickHandler = () => {
    navigate(`/advertisement/${id}`);
  };

  return (
    <button
      type="button"
      className={s.advertisementItem}
      onClick={onClickHandler}
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
      </div>
      <div className={s.advertisementItemInfo}>
        <Price price={price} />
        <div className={s.title}>{title}</div>
      </div>
    </button>
  );
};

export default AdvertisementItem;
