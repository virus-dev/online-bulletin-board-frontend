import React from 'react';
import AdvertisementsRibbon from 'Components/AdvertisementsRibbon/AdvertisementsRibbon';
import Header from 'Components/Header/Header';
import Container from 'Storybook/Container/Container';
import AdvertisementAPI from 'Services/AdvertisementAPI';

import s from './PageMyAdvertisements.module.scss';

const PageMyAdvertisements = () => {
  const { data, isLoading } = AdvertisementAPI.useGetAllMyAdvertisementQuery();

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

export default PageMyAdvertisements;
