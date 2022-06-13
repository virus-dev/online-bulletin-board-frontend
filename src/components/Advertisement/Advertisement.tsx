import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import Container from 'Storybook/Container/Container';
import i18 from 'Utils/i18';
import Price from 'Components/Price/Price';
import { useAppDispatch, useAppSelector } from 'Hooks/redux';
import { fetchAdvertisement } from 'Store/advertisement/advertisementAsyncActions';
import { selectorAdvertisement } from 'Store/advertisement/advertisementSelectors';
import { selectorCategoriesData } from 'Store/categories/categoriesSelectors';
import { selectorBrandsData } from 'Store/brands/brandsSelectors';
import dateFromZFormat, { VariantsFormsts } from 'Utils/dateFromZFormat';
import useIsAuth from 'Hooks/useIsAuth';
import AdvertisementSlider from '../AdvertisementSlider/AdvertisementSlider';
import AdvertisementOwner from '../AdvertisementOwner/AdvertisementOwner';
import ConfirmModerateButtons from './components/ConfirmModerateButtons/ConfirmModerateButtons';

import s from './Advertisement.module.scss';

const Advertisement = () => {
  const { isAdminRole, isModeratorRole } = useIsAuth();
  const isCanModerate = isAdminRole || isModeratorRole;
  const { advertisementId } = useParams();
  const dispatch = useAppDispatch();
  const {
    data: {
      advertisementImages,
      brandId,
      categoryId,
      createdAt,
      description,
      price,
      status,
      title,
      updatedAt,
    },
    isLoading,
  } = useAppSelector(selectorAdvertisement);
  const dataCategories = useAppSelector(selectorCategoriesData);
  const dataBrands = useAppSelector(selectorBrandsData);

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

  useEffect(() => {
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
        <AdvertisementOwner />
        {isCanModerate && status !== 'open' && <ConfirmModerateButtons />}
      </div>
    </Container>
  );
};

export default Advertisement;
