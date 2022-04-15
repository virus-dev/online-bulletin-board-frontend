import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdvertisementApi from '../../services/AdvertisementAPI';

import s from './AdvertisementItem.module.scss';

interface AdvertisementItemProps {
  id: number,
  title: string,
  price: number,
}

const AdvertisementItem: React.FC<AdvertisementItemProps> = ({ id, price, title }) => {
  const navigate = useNavigate();
  const { data, isLoading } = AdvertisementApi.useGetImagesQuery(id);

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
        {isLoading ? <div>isLoading</div> : (
          <div>
            {data?.length ? (
              <img src={data[0]} alt="*" />
            ) : (
              <div>awdaw</div>
            )}
          </div>
        )}
      </div>
      <div className={s.advertisementItemInfo}>
        <div className={s.title}>{title}</div>
        <div className={s.price}>{`${price}₽`}</div>
      </div>
    </button>
  );
};

export default AdvertisementItem;
