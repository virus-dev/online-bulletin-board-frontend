import React from 'react';
import Advertisement from '../Advertisement/Advertisement';
import useFetchUnloginDataAdvertisement from './useFetchUnloginDataAdvertisement';

const AdvertisementUnloginContainer = () => {
  const {
    brandId,
    categoryId,
    createdAt,
    updatedAt,
    dataBrands,
    dataCategories,
    dataImagesAdvertisement,
    description,
    isLoading,
    price,
    status,
    title,
    userId,
  } = useFetchUnloginDataAdvertisement();

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
      isCanModerate={false}
      updatedAt={updatedAt}
    />
  );
};

export default AdvertisementUnloginContainer;
