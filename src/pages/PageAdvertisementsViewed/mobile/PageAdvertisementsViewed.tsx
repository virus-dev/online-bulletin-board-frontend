import React, { useState } from 'react';
import Header from 'Components/Header/Header';
import AdvertisementsRibbon from 'Components/AdvertisementsRibbon/AdvertisementsRibbon';
import Container from 'Components/storybook/Container/Container';
import Filters from 'Components/Filters/Filters';
import AdvertisementAPI from 'Services/AdvertisementAPI';

import s from './PageAdvertisementsViewed.module.scss';

const PageAdvertisementsViewed = () => {
  const [getAllQuery, setGetAllQuery] = useState({
    limit: 12,
    page: 1,
    categoryId: 0,
    brandId: 0,
    advertisementsViewed: localStorage.getItem('advertisementsViewed') || '',
  });

  const onChangeFilters = (value: unknown, field: string) => {
    setGetAllQuery((prev) => ({ ...prev, [field]: value, page: 1 }));
  };

  const {
    data,
    isLoading,
  } = AdvertisementAPI.useGetCurrentAdvertisementQuery(getAllQuery);

  const onScrollEnd = () => {
    setGetAllQuery((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <>
      <Header />
      <Container>
        <div className={s.title}>Все объявления</div>
        <Filters onChange={onChangeFilters} categoryId={getAllQuery.categoryId} withoutSort />
      </Container>
      <AdvertisementsRibbon isLoading={isLoading} data={data} onScrollEnd={onScrollEnd} />
    </>
  );
};

export default PageAdvertisementsViewed;
