import React from 'react';
import AdvertisementsRibbon from '../../components/AdvertisementsRibbon/AdvertisementsRibbon';
import Header from '../../components/Header/Header';
import MainSlider from '../../components/MainSlider/MainSlider';
import AdvertisementAPI from '../../services/AdvertisementAPI';

import s from './MainPage.module.scss';

const MainPage = () => {
  const {
    data,
    isLoading,
  } = AdvertisementAPI.useGetAllQuery({ limit: 20, page: 1 });

  return (
    <>
      <Header />
      <MainSlider />
      <AdvertisementsRibbon data={data} isLoading={isLoading} />
    </>
  );
};

export default MainPage;
