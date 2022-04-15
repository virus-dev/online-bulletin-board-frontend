import React from 'react';
import Header from '../../components/Header/Header';
import AdvertisementCreate from '../../components/AdvertisementCreate/AdvertisementCreate';

import s from './AdvertisementCreate.module.scss';

const AdvertisementCreatePage = () => (
  <div>
    <Header />
    <AdvertisementCreate />
  </div>
);

export default AdvertisementCreatePage;
