import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AdvertisementApi from '../../services/AdvertisementAPI';
import BrandsApi from '../../services/BrandsAPI';
import CategoriesApi from '../../services/CategoriesAPI';
import AdvertisementSlider from '../AdvertisementSlider/AdvertisementSlider';
import Container from '../storybook/Container/Container';
import SocketContext from '../../context/SocketContext';
import IconProfile from '../IconProfile/IconProfile';
import UserApi from '../../services/UserApi';

import s from './Advertisement.module.scss';
import useFetchDataAdvertisement from './useFetchDataAdvertisement';
import AdvertisementOwner from '../AdvertisementOwner/AdvertisementOwner';

const Advertisement: React.FC = () => {
  const { socket, isConnected } = useContext(SocketContext);

  const fetchData = useFetchDataAdvertisement();

  if (fetchData.isLoading) {
    return <div>Loading...</div>;
  }

  const {
    brandId,
    categoryId,
    createdAt,
    description,
    price,
    status,
    title,
    userId,
    dataImagesAdvertisement,
    dataCategories,
    dataBrands,
  } = fetchData;

  return (
    <Container>
      <div className={s.advertisement}>
        <div className={s.status}>{status === 'moderation' && 'Объявление еще находится на модерации'}</div>
        <div className={s.title}>{title}</div>
        <div className={s.price}>
          <span>{price}</span>
          <span>Р</span>
        </div>
        <AdvertisementSlider
          data={dataImagesAdvertisement}
        />
        <div>
          <span>Категория: </span>
          <span>{dataCategories?.find(({ id }) => categoryId === id)?.name}</span>
        </div>
        <div>
          <span>Бренд: </span>
          <span>{dataBrands?.find(({ id }) => brandId === id)?.name}</span>
        </div>
        <div>
          <span>Описание: </span>
          <span>{description}</span>
        </div>
        <AdvertisementOwner userId={userId} />
      </div>
    </Container>
  );
};

export default Advertisement;
