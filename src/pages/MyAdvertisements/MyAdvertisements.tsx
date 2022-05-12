import React from 'react';
import AdvertisementsRibbon from 'Components/AdvertisementsRibbon/AdvertisementsRibbon';
import Header from 'Components/Header/Header';
import Container from 'Storybook/Container/Container';
import AdvertisementApi from 'Services/AdvertisementAPI';

import s from './MyAdvertisements.module.scss';

const MyAdvertisements = () => {
  const { data, isLoading } = AdvertisementApi.useGetAllMyAdvertisementQuery();

  return (
    <>
      <Header />
      <Container>
        <h1 className={s.title}>Мои объявления</h1>
        <AdvertisementsRibbon data={data} isLoading={isLoading} />
      </Container>
    </>
  );
};

export default MyAdvertisements;
