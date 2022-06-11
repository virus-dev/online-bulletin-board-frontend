import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdvertisementAPI from 'Services/AdvertisementAPI';
import BrandsAPI from 'Services/BrandsAPI';
import CategoriesAPI from 'Services/CategoriesAPI';

const useFetchLoginDataAdvertisement = () => {
  const { advertisementId } = useParams();

  const {
    data: {
      categoryId,
    } = {},
    isLoading: isLoadingAdvertisement,
  } = AdvertisementAPI.useGetOneMaybeNotPublicQuery(Number(advertisementId));
  const {
    data: dataCategories, isLoading: isLoadingCategories,
  } = CategoriesAPI.useGetCategoriesQuery();
  const [
    target,
    { data: dataBrands, isSuccess: isSuccessBrands },
  ] = BrandsAPI.useLazyGetBrandsQuery();

  useEffect(() => {
    if (categoryId) {
      target(categoryId);
    }
  }, [categoryId, target]);

  const res = {
    dataCategories,
    dataBrands,
  };

  if (
    isLoadingAdvertisement
    && isSuccessBrands
    && isLoadingCategories
  ) {
    return { ...res, isLoading: true };
  }

  return res;
};

export default useFetchLoginDataAdvertisement;
