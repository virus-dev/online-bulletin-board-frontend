import React, { useEffect, useState } from 'react';
import Header from 'Components/Header/Header';
import AdvertisementsRibbon from 'Components/AdvertisementsRibbon/AdvertisementsRibbon';
import MainSlider from 'Components/MainSlider/MainSlider';
import { useAppSelector } from 'Hooks/redux';
import AdvertisementAPI from 'Services/AdvertisementAPI';
import isProduction from 'Utils/isProduction';
import Container from 'Components/storybook/Container/Container';
import Filters from 'Components/Filters/Filters';

import s from './MainPage.module.scss';

const MainPage = () => {
  const advertisementSearch = useAppSelector(({ inputs }) => inputs.inputs.advertisementSearch);
  const [getAllQuery, setGetAllQuery] = useState({
    limit: 12,
    page: 1,
    title: '',
    categoryId: 0,
    brandId: 0,
    sort: '',
  });

  const onChangeFilters = (value: unknown, field: string) => {
    setGetAllQuery((prev) => ({ ...prev, [field]: value, page: 1 }));
  };

  const {
    data,
    isLoading,
  } = AdvertisementAPI.useGetAllQuery(getAllQuery);

  useEffect(() => {
    (() => {
      setGetAllQuery((prev) => ({ ...prev, title: advertisementSearch, page: 1 }));
    })();
  }, [advertisementSearch]);

  const callback = () => {
    setGetAllQuery((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <>
      <Header />
      {!isProduction() && <MainSlider />}
      <Container>
        <div className={s.title}>Все объявления</div>
        <Filters onChange={onChangeFilters} categoryId={getAllQuery.categoryId} />
      </Container>
      <AdvertisementsRibbon data={data} isLoading={isLoading} onScrollEnd={callback} />
    </>
  );
};

export default MainPage;
