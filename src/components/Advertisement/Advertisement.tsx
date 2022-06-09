import React, { useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import Container from 'Storybook/Container/Container';
import { Brands } from 'Models/Brands';
import { Categories } from 'Models/Categories';
import i18 from 'Utils/i18';
import Price from 'Components/Price/Price';
import { useAppDispatch, useAppSelector } from 'Hooks/redux';
import { fetchAdvertisement } from 'Store/advertisement/advertisementAsyncActions';
import { selectorAdvertisement } from 'Store/advertisement/advertisementSelectors';
import useInjectAsyncReducers from 'Hooks/useInjectReducer';
import { Undefineable } from 'Utils/typeScript';
import dateFromZFormat, { VariantsFormsts } from 'Utils/dateFromZFormat';
import AdvertisementSlider from '../AdvertisementSlider/AdvertisementSlider';
import AdvertisementOwner from '../AdvertisementOwner/AdvertisementOwner';
import ConfirmModerateButtons from './components/ConfirmModerateButtons/ConfirmModerateButtons';
import asyncReducers from './asyncReducers';

import s from './Advertisement.module.scss';

type AdvertisementProps = Undefineable<{
  dataCategories: Categories[],
  dataBrands: Brands[],
  isCanModerate: boolean,
}>;

const Advertisement: React.FC<AdvertisementProps> = ({
  dataCategories,
  dataBrands,
  isCanModerate,
}) => {
  useInjectAsyncReducers(asyncReducers);
  const { advertisementId } = useParams();
  const dispatch = useAppDispatch();
  const {
    advertisementImages,
    brandId,
    categoryId,
    createdAt,
    description,
    isLoading,
    price,
    status,
    title,
    updatedAt,
    userId,
  } = useAppSelector(selectorAdvertisement);

  useEffect(() => {
    if (advertisementId) {
      const advertisementsViewed = localStorage.getItem('advertisementsViewed');

      const advertisementsViewedArr = advertisementsViewed ? advertisementsViewed.split(',') : [];

      const isAlreadyViewed = advertisementsViewedArr.some((el: string) => el === advertisementId);

      if (isAlreadyViewed) {
        const index = advertisementsViewedArr.indexOf(advertisementId);
        advertisementsViewedArr.splice(index, 1);
        advertisementsViewedArr.unshift(advertisementId);
        const advertisementsViewedRes = advertisementsViewedArr.join(',');
        localStorage.setItem('advertisementsViewed', advertisementsViewedRes);
      } else {
        advertisementsViewedArr.unshift(advertisementId);
        const advertisementsViewedRes = advertisementsViewedArr.join(',');
        localStorage.setItem('advertisementsViewed', advertisementsViewedRes);
      }
    }
  }, [advertisementId]);

  useLayoutEffect(() => {
    dispatch(fetchAdvertisement(Number(advertisementId)));
  }, [advertisementId, dispatch]);

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
          data={advertisementImages}
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
