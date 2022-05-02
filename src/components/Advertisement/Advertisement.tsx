import React from 'react';
import AdvertisementSlider from '../AdvertisementSlider/AdvertisementSlider';
import Container from '../storybook/Container/Container';
import AdvertisementOwner from '../AdvertisementOwner/AdvertisementOwner';
import { Brands } from '../../models/Brands';
import { Categories } from '../../models/Categories';
import ConfirmModerateButtons from './components/ConfirmModerateButtons/ConfirmModerateButtons';

import s from './Advertisement.module.scss';

interface AdvertisementProps {
  isLoading: boolean | undefined,
  brandId: number | undefined,
  categoryId: number | undefined,
  createdAt: string | undefined,
  description: string | undefined,
  price: number | undefined,
  status: string | undefined,
  title: string | undefined,
  userId: number | undefined,
  dataImagesAdvertisement: string[] | undefined,
  dataCategories: Categories[] | undefined,
  dataBrands: Brands[] | undefined,
  isCanModerate: boolean | undefined,
}

const Advertisement: React.FC<AdvertisementProps> = ({
  isLoading,
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
  isCanModerate,
}) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className={s.advertisement}>
        <div className={s.status}>{status === 'moderation' && 'Объявление еще находится на модерации'}</div>
        <div className={s.status}>{status === 'close' && 'Объявление не прошло модерацию'}</div>
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
        {isCanModerate && status !== 'open' && <ConfirmModerateButtons />}
      </div>
    </Container>
  );
};

export default Advertisement;
