import React from 'react';
import Advertisement from '../Advertisement/Advertisement';
import useFetchUnloginDataAdvertisement from './useFetchUnloginDataAdvertisement';

const AdvertisementUnloginContainer = () => {
  const {
    dataBrands,
    dataCategories,
  } = useFetchUnloginDataAdvertisement();

  return (
    <Advertisement
      dataBrands={dataBrands}
      dataCategories={dataCategories}
      isCanModerate={false}
    />
  );
};

export default AdvertisementUnloginContainer;
