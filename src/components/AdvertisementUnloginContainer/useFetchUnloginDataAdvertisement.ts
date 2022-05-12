import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdvertisementApi from 'Services/AdvertisementAPI';
import BrandsApi from 'Services/BrandsAPI';
import CategoriesApi from 'Services/CategoriesAPI';

const useFetchUnloginDataAdvertisement = () => {
  const { advertisementId } = useParams();

  const {
    data: {
      brandId, categoryId, createdAt, description, price, status, title, userId,
    } = {},
    isLoading: isLoadingAdvertisement,
  } = AdvertisementApi.useGetOneQuery(Number(advertisementId));
  const {
    data: dataImagesAdvertisement = [],
    isLoading: isLoadingImagesAdvertisement,
  } = AdvertisementApi.useGetImagesQuery(Number(advertisementId));
  const {
    data: dataCategories, isLoading: isLoadingCategories,
  } = CategoriesApi.useGetCategoriesQuery();
  const [
    target,
    { data: dataBrands, isSuccess: isSuccessBrands },
  ] = BrandsApi.useLazyGetBrandsQuery();

  useEffect(() => {
    if (categoryId) {
      target(categoryId);
    }
  }, [categoryId, target]);

  const res = {
    brandId,
    categoryId,
    createdAt,
    description,
    price,
    status,
    title,
    userId,
    dataImagesAdvertisement,
    dataCategories,
    dataBrands,
    isLoading: false,
  };

  if (
    isLoadingAdvertisement
    && isLoadingImagesAdvertisement
    && isSuccessBrands
    && isLoadingCategories
  ) {
    return { ...res, isLoading: true };
  }

  return res;
};

export default useFetchUnloginDataAdvertisement;
