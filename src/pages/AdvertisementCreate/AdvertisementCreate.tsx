import React from 'react';
import Header from 'Components/Header/Header';
import AdvertisementCreate from 'Components/AdvertisementCreate/AdvertisementCreate';

import s from './AdvertisementCreate.module.scss';

const AdvertisementCreatePage = () => (
  <div>
    <Header />
    <AdvertisementCreate />
  </div>
);

export default AdvertisementCreatePage;
