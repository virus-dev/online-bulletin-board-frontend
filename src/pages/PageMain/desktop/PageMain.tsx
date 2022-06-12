import React, { useEffect, useState } from 'react';
import Header from 'Components/Header/Header';
import AdvertisementsRibbon from 'Components/AdvertisementsRibbon/AdvertisementsRibbon';
import MainSlider from 'Components/MainSlider/MainSlider';
import { useAppDispatch, useAppSelector } from 'Hooks/redux';
import isProduction from 'Utils/isProduction';
import Container from 'Components/storybook/Container/Container';
import Filters from 'Components/Filters/Filters';
import { fetchAllAdvertisements } from 'Store/advertisements/advertisementsAsyncActions';
import { selectorAdvertisementsData, selectorAdvertisementsIsLoading } from 'Store/advertisements/advertisementsSelectors';
import { advertisementsSlice } from 'Store/advertisements/advertisementsSlice';
import useDebounce from 'Hooks/useDebounce';
import { selectorInputsAdvertisementSearch } from 'Store/inputs/inputsSelector';
import useIsFirstRender from 'Hooks/useIsFirstRender';

import s from './PageMain.module.scss';

const MainPage = () => {
  const isFirstRender = useIsFirstRender();
  const dispatch = useAppDispatch();
  const advertisementSearch = useAppSelector(selectorInputsAdvertisementSearch);
  const data = useAppSelector(selectorAdvertisementsData);
  const isLoading = useAppSelector(selectorAdvertisementsIsLoading);

  const [getAllParams, setGetAllParams] = useState({
    limit: 14,
    page: 1,
    title: '',
    categoryId: 0,
    brandId: 0,
    sort: '',
  });

  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchAllAdvertisements({ params: getAllParams, prevAdvertisements: data }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getAllParams]);

  const searchNewAdvertisements = useDebounce(() => {
    if (!isFirstRender) {
      const { advertisementsClear } = advertisementsSlice.actions;
      dispatch(advertisementsClear());
      setGetAllParams((prev) => ({ ...prev, title: advertisementSearch, page: 1 }));
    }
  }, 500);

  const onChangeFilters = (value: unknown, field: string) => {
    const { advertisementsClear } = advertisementsSlice.actions;
    dispatch(advertisementsClear());
    setGetAllParams((prev) => ({ ...prev, [field]: value, page: 1 }));
  };

  useEffect(() => {
    searchNewAdvertisements();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advertisementSearch]);

  const callback = () => {
    setGetAllParams((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <>
      <Header />
      {!isProduction() && <MainSlider />}
      <Container>
        <div className={s.title}>Все объявления</div>
        <Filters onChange={onChangeFilters} categoryId={getAllParams.categoryId} />
      </Container>
      <AdvertisementsRibbon onScrollEnd={callback} />
    </>
  );
};

export default MainPage;
