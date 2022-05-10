import React from 'react';
import AdvertisementsRibbon from '../../components/AdvertisementsRibbon/AdvertisementsRibbon';
import Header from '../../components/Header/Header';
import Container from '../../components/storybook/Container/Container';
import AdvertisementApi from '../../services/AdvertisementAPI';

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
