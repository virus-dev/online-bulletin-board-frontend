import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from 'Components/Header/Header';
import AdvertisementsRibbon from 'Components/AdvertisementsRibbon/AdvertisementsRibbon';
import Container from 'Components/storybook/Container/Container';
import Filters from 'Components/Filters/Filters';
import { useAppSelector } from 'Hooks/redux';
import { selectorAdvertisements } from 'Store/advertisements/advertisementsSelectors';
import { advertisementsSlice } from 'Store/advertisements/advertisementsSlice';
import { fetchAllAdvertisements } from 'Store/advertisements/advertisementsAsyncActions';
import useIsFirstRender from 'Hooks/useIsFirstRender';

import s from './PageAdvertisementsViewed.module.scss';

const PageAdvertisementsViewed = () => {
  const isFirstRender = useIsFirstRender();
  const dispatch = useDispatch();
  const {
    data,
    isLoading,
  } = useAppSelector(selectorAdvertisements);

  const [getAllParams, setGetAllParams] = useState({
    limit: 14,
    page: 1,
    categoryId: 0,
    brandId: 0,
    advertisementsViewed: localStorage.getItem('advertisementsViewed') || '',
  });

  useEffect(() => {
    dispatch(fetchAllAdvertisements({ params: getAllParams, prevAdvertisements: [] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && !isFirstRender) {
      dispatch(fetchAllAdvertisements({ params: getAllParams, prevAdvertisements: data }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getAllParams]);

  const onChangeFilters = (value: unknown, field: string) => {
    const { advertisementsClear } = advertisementsSlice.actions;
    dispatch(advertisementsClear());
    setGetAllParams((prev) => ({ ...prev, [field]: value, page: 1 }));
  };

  const onScrollEnd = () => {
    setGetAllParams((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <>
      <Header />
      <Container>
        <div className={s.title}>Все объявления</div>
        <Filters onChange={onChangeFilters} categoryId={getAllParams.categoryId} withoutSort />
      </Container>
      <AdvertisementsRibbon onScrollEnd={onScrollEnd} />
    </>
  );
};

export default PageAdvertisementsViewed;
