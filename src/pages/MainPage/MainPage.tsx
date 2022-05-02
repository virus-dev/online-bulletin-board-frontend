import React, { useEffect, useState } from 'react';
import AdvertisementsRibbon from '../../components/AdvertisementsRibbon/AdvertisementsRibbon';
import Header from '../../components/Header/Header';
import MainSlider from '../../components/MainSlider/MainSlider';
import { useAppSelector } from '../../hooks/redux';
import AdvertisementAPI from '../../services/AdvertisementAPI';

import s from './MainPage.module.scss';

const MainPage = () => {
  const advertisementSearch = useAppSelector(({ inputs }) => inputs.inputs.advertisementSearch);
  const [getAllQuery, setGetAllQuery] = useState({ limit: 20, page: 1, title: '' });

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
      <MainSlider />
      <AdvertisementsRibbon data={data} isLoading={isLoading} onScrollEnd={callback} />
    </>
  );
};

export default MainPage;
