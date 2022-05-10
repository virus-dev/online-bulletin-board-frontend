import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandsApi from '../../services/BrandsAPI';
import CategoriesApi from '../../services/CategoriesAPI';
import AdvertisementAPI from '../../services/AdvertisementAPI';
import Button from '../storybook/Button/Button';
import Container from '../storybook/Container/Container';
import { checkFileForImgBB } from '../../utils/getCheckFileFunc';

import s from './AdvertisementCreate.module.scss';
import { RouteNames } from '../../models/Route';
import Input from '../storybook/Input/Input';
import ValidationError from '../storybook/ValidationError/ValidationError';
import getErrorValidationMessage from '../../utils/getErrorMessage';
import i18 from '../../utils/i18';

interface AdvertisementData {
  categoryId: string,
  brandId: string,
  title: string,
  price: string,
  description: string,
  files: File[],
}

const AdvertisementCreate = () => {
  const navigate = useNavigate();
  const {
    data: dataCategories = [], isLoading: isLoadingCategories,
  } = CategoriesApi.useGetCategoriesQuery();
  const [
    trigger,
    { isLoading: isLoadingBrands, data: dataBrands = [] },
  ] = BrandsApi.useLazyGetBrandsQuery();
  const [
    create,
    { isLoading: isLoadingCreate, isSuccess, error },
  ] = AdvertisementAPI.useCreateMutation();
  const isLoading = isLoadingCategories;

  useEffect(() => {
    if (isSuccess) {
      navigate(RouteNames.ADVERTISEMENT_MY_ADVERTISEMENTS);
    }
  }, [isSuccess, navigate]);

  const [advertisementData, setAdvertisementData] = useState<AdvertisementData>({
    categoryId: '0',
    brandId: '0',
    title: '',
    price: '',
    description: '',
    files: [],
  });

  useEffect(() => {
    if (!advertisementData.categoryId) {
      return;
    }

    trigger(Number(advertisementData.categoryId));
  }, [advertisementData.categoryId, trigger]);

  const onChangeSelecthandler = (
    { target }: React.ChangeEvent<HTMLSelectElement>,
    name: string,
  ) => {
    setAdvertisementData((prev) => ({ ...prev, [name]: target.value }));
  };

  const onChangeInputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setAdvertisementData((prev) => ({ ...prev, [name]: target.value }));
  };

  const onChangeTextareaHandler = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAdvertisementData((prev) => ({ ...prev, description: target.value }));
  };

  const onChangeFileHandler = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    const filesVerify: File[] = [];

    [].forEach.call(files, (file) => {
      if (!checkFileForImgBB(file)) {
        // TODO: добавить ошибку
        console.log('Можно загружать файлы формата ".png", ".jpg", не превышающие размер 32МБ');
        return;
      }

      filesVerify.push(file);
    });

    setAdvertisementData((prev) => ({ ...prev, files: filesVerify }));
  };

  const onClickButtonHandler = () => {
    const {
      brandId,
      categoryId,
      description,
      price,
      title,
      files,
    } = advertisementData;

    const formData = new FormData();
    formData.append('brandId', brandId);
    formData.append('categoryId', categoryId);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('title', title);

    if (files.length) {
      files.forEach((file) => {
        formData.append('file', file);
      });
    }

    create(formData);
  };

  const textInBrandsSelect = () => {
    if (isLoadingBrands) {
      return 'Загрузка';
    }

    if (advertisementData.categoryId === '0') {
      return 'Выберите сначала категорию';
    }

    return 'Выберите вариант';
  };

  return (
    <Container className={s.advertisementCreateWrapper}>
      {
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <p>Категория</p>
            <select onChange={(e) => onChangeSelecthandler(e, 'categoryId')}>
              <option value="0">Выберите вариант</option>
              {dataCategories.map(({ id, name }) => (
                <option value={String(id)} key={name}>{i18(name)}</option>
              ))}
            </select>
            <ValidationError error={getErrorValidationMessage(error, 'categoryId')} />
            <div className={s.br} />
            <p>Бренд</p>
            <select onChange={(e) => onChangeSelecthandler(e, 'brandId')}>
              <option value="0">{textInBrandsSelect()}</option>
              {dataBrands.map(({ id, name }) => (
                <option value={String(id)} key={name}>{i18(name)}</option>
              ))}
            </select>
            <ValidationError error={getErrorValidationMessage(error, 'brandId')} />
            <div className={s.br} />
            <p>Название товара</p>
            <Input onChange={(e) => onChangeInputHandler(e, 'title')} name="title" value={advertisementData.title} />
            <ValidationError error={getErrorValidationMessage(error, 'title')} />
            <div className={s.br} />
            <p>Цена</p>
            <input type="text" onChange={(e) => onChangeInputHandler(e, 'price')} />
            <ValidationError error={getErrorValidationMessage(error, 'price')} />
            <div className={s.br} />
            <p>Описание</p>
            <textarea onChange={onChangeTextareaHandler} />
            <ValidationError error={getErrorValidationMessage(error, 'description')} />
            <div className={s.br} />
            <p>Фотографии</p>
            <input type="file" multiple onChange={onChangeFileHandler} />
            <div className={s.br} />
            <Button onClick={onClickButtonHandler} isLoading={isLoadingCreate}>Создать</Button>
          </div>
        )
      }
    </Container>
  );
};

export default AdvertisementCreate;
