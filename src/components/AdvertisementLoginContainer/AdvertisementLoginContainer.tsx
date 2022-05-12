import React from 'react';
import useIsAuth from 'Hooks/useIsAuth';
import Advertisement from '../Advertisement/Advertisement';
import useFetchLoginDataAdvertisement from './useFetchLoginDataAdvertisement';

const AdvertisementContainer = () => {
  const { isAdminRole } = useIsAuth();

  const {
    brandId,
    categoryId,
    createdAt,
    dataBrands,
    dataCategories,
    dataImagesAdvertisement,
    description,
    isLoading,
    price,
    status,
    title,
    userId,
  } = useFetchLoginDataAdvertisement();

  return (
    <Advertisement
      brandId={brandId}
      categoryId={categoryId}
      createdAt={createdAt}
      dataBrands={dataBrands}
      dataCategories={dataCategories}
      dataImagesAdvertisement={dataImagesAdvertisement}
      description={description}
      isLoading={isLoading}
      price={price}
      status={status}
      title={title}
      userId={userId}
      isCanModerate={isAdminRole}
    />
  );
};

export default AdvertisementContainer;
