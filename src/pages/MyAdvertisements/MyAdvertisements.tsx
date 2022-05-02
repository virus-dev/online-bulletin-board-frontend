import React from 'react';
import AdvertisementsRibbon from '../../components/AdvertisementsRibbon/AdvertisementsRibbon';
import Header from '../../components/Header/Header';
import Container from '../../components/storybook/Container/Container';
import AdvertisementApi from '../../services/AdvertisementAPI';

const MyAdvertisements = () => {
  const { data, isLoading } = AdvertisementApi.useGetAllMyAdvertisementQuery();

  return (
    <>
      <Header />
      <Container>
        <AdvertisementsRibbon data={data} isLoading={isLoading} />
      </Container>
    </>
  );
};

export default MyAdvertisements;
