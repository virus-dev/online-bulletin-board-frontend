import React from 'react';
import classNames from 'classnames';
import Container from 'Storybook/Container/Container';
import { Brands } from 'Models/Brands';
import { Categories } from 'Models/Categories';
import i18 from 'Utils/i18';
import Price from 'Components/Price/Price';
import dateFromZFormat, { VariantsFormsts } from 'Utils/dateFromZFormat';
import AdvertisementSlider from '../AdvertisementSlider/AdvertisementSlider';
import AdvertisementOwner from '../AdvertisementOwner/AdvertisementOwner';
import ConfirmModerateButtons from './components/ConfirmModerateButtons/ConfirmModerateButtons';

import s from './Advertisement.module.scss';

interface AdvertisementProps {
  isLoading: boolean | undefined,
  brandId: number | undefined,
  categoryId: number | undefined,
  createdAt: string | undefined,
  updatedAt: string | undefined,
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
  updatedAt,
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
        <AdvertisementSlider
          data={dataImagesAdvertisement}
        />
        {price && (
          <div className={s.priceBlock}>
            <div className={s.priceText}>Цена:</div>
            <Price price={price} />
          </div>
        )}
        <div className={s.blocksWrapper}>
          <div className={classNames(s.block, s.blockCategory)}>
            <span>Категория: </span>
            <span>{i18(dataCategories?.find(({ id }) => categoryId === id)?.name)}</span>
          </div>
          <div className={classNames(s.block, s.blockBrand)}>
            <span>Бренд: </span>
            <span>{i18(dataBrands?.find(({ id }) => brandId === id)?.name)}</span>
          </div>
          <div className={classNames(s.block, s.blockCreated)}>
            <span>Объявление создано: </span>
            <span>
              {dateFromZFormat({ date: createdAt, variantsFormsts: VariantsFormsts.day })}
            </span>
          </div>
          <div className={classNames(s.block, s.blockUpdated)}>
            <span>Объявление обновлено: </span>
            <span>
              {dateFromZFormat({ date: updatedAt, variantsFormsts: VariantsFormsts.day })}
            </span>
          </div>
          <div className={classNames(s.block, s.blockDescription)}>
            <span>Описание: </span>
            <span>{description}</span>
          </div>
        </div>
        <AdvertisementOwner userId={userId} />
        {isCanModerate && status !== 'open' && <ConfirmModerateButtons />}
      </div>
    </Container>
  );
};

export default Advertisement;
