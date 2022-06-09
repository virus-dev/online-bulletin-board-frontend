import React from 'react';
import useIsAuth from 'Hooks/useIsAuth';
import Advertisement from '../Advertisement/Advertisement';
import useFetchLoginDataAdvertisement from './useFetchLoginDataAdvertisement';

const AdvertisementContainer = () => {
  const { isAdminRole } = useIsAuth();

  const {
    dataBrands,
    dataCategories,
  } = useFetchLoginDataAdvertisement();

  return (
    <Advertisement
      dataBrands={dataBrands}
      dataCategories={dataCategories}
      isCanModerate={isAdminRole}
    />
  );
};

export default AdvertisementContainer;
