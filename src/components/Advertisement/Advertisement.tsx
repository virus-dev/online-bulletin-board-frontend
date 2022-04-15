import React from 'react';
import { useParams } from 'react-router-dom';
import AdvertisementApi from '../../services/AdvertisementAPI';
import BrandsApi from '../../services/BrandsAPI';
import CategoriesApi from '../../services/CategoriesAPI';
import AdvertisementSlider from '../AdvertisementSlider/AdvertisementSlider';
import Container from '../storybook/Container/Container';

import s from './Advertisement.module.scss';

const Advertisement: React.FC = () => {
  const { advertisementId } = useParams();

  const {
    data: {
      brandId, categoryId, description, price, title, userId, status,
    } = {},
    isLoading: isLoadingDataAdvertisement,
  } = AdvertisementApi.useGetOneQuery(Number(advertisementId));

  const {
    data: dataImagesAdvertisement,
    isLoading: isLoadingDataImagesAdvertisement,
  } = AdvertisementApi.useGetImagesQuery(Number(advertisementId));

  const {
    data: categories,
    isLoading: isLoadingCategories,
  } = CategoriesApi.useGetCategoriesQuery();

  const {
    data: brands,
    isLoading: isLoadingBrands,
  } = BrandsApi.useGetBrandsQuery();

  if (
    isLoadingDataAdvertisement
    || isLoadingDataImagesAdvertisement
    || isLoadingCategories
    || isLoadingBrands
  ) {
    return <div>Loading...</div>;
  }

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
          isLoading={isLoadingDataImagesAdvertisement}
        />
        <div>
          <span>Категория: </span>
          <span>{categories?.find(({ id }) => categoryId === id)?.name}</span>
        </div>
        <div>
          <span>Бренд: </span>
          <span>{brands?.find(({ id }) => categoryId === id)?.name}</span>
        </div>
      </div>
    </Container>
  );
};

export default Advertisement;
