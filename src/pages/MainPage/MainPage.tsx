import React from 'react';
import AdvertisementsRibbon from '../../components/AdvertisementsRibbon/AdvertisementsRibbon';
import Header from '../../components/Header/Header';
import MainSlider from '../../components/MainSlider/MainSlider';

import s from './MainPage.module.scss';

const MainPage = () => (
  <>
    <Header />
    <MainSlider />
    <AdvertisementsRibbon />
  </>
);

export default MainPage;
