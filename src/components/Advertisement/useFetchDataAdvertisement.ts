import { useParams } from 'react-router-dom';
import AdvertisementApi from '../../services/AdvertisementAPI';
import BrandsApi from '../../services/BrandsAPI';
import CategoriesApi from '../../services/CategoriesAPI';

const useFetchDataAdvertisement = () => {
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
  const {
    data: dataBrands, isLoading: isLoadingBrands,
  } = BrandsApi.useGetBrandsQuery();

  if (
    isLoadingAdvertisement
    && isLoadingImagesAdvertisement
    && isLoadingBrands
    && isLoadingCategories
  ) {
    return { isLoading: true };
  }

  return {
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
  };
};

export default useFetchDataAdvertisement;
