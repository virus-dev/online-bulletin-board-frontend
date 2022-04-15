import React, { useState } from 'react';
import BrandsApi from '../../services/BrandsAPI';
import CategoriesApi from '../../services/CategoriesAPI';
import AdvertisementAPI from '../../services/AdvertisementAPI';
import Button from '../storybook/Button/Button';
import Container from '../storybook/Container/Container';
import { checkFileForImgBB } from '../../utils/getCheckFileFunc';

import s from './AdvertisementCreate.module.scss';

interface AdvertisementData {
  categoryId: string | null,
  brandId: string | null,
  title: string,
  price: string,
  description: string,
  files: File[],
}

const AdvertisementCreate = () => {
  const {
    data: dataCategories = [], isLoading: isLoadingCategories,
  } = CategoriesApi.useGetCategoriesQuery();
  const { data: dataBrands = [], isLoading: isLoadingBrands } = BrandsApi.useGetBrandsQuery();
  const [create] = AdvertisementAPI.useCreateMutation();
  const isLoading = isLoadingCategories || isLoadingBrands;

  const [advertisementData, setAdvertisementData] = useState<AdvertisementData>({
    categoryId: '1',
    brandId: '1',
    title: 'Продам Срочно!',
    price: '5000',
    description: 'Возможен торг, товар отличный',
    files: [],
  });

  console.log('advertisementData', advertisementData);

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

    if (!brandId || !categoryId || !description || !price || !title) {
      return;
    }

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

  return (
    <Container className={s.advertisementCreateWrapper}>
      {
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <p>Категория</p>
            <select onChange={(e) => onChangeSelecthandler(e, 'categoryId')}>
              <option value={0}>Выберите вариант</option>
              {dataCategories.map(({ id, name }) => (
                <option value={String(id)} key={name}>{name}</option>
              ))}
            </select>
            <div className={s.br} />
            <p>Бренд</p>
            <select onChange={(e) => onChangeSelecthandler(e, 'brandId')}>
              <option value={0}>Выберите вариант</option>
              {dataBrands.map(({ id, name }) => (
                <option value={String(id)} key={name}>{name}</option>
              ))}
            </select>
            <div className={s.br} />
            <p>Название товара</p>
            <input type="text" onChange={(e) => onChangeInputHandler(e, 'title')} />
            <div className={s.br} />
            <p>Цена</p>
            <input type="text" onChange={(e) => onChangeInputHandler(e, 'price')} />
            <div className={s.br} />
            <p>Описание</p>
            <textarea onChange={onChangeTextareaHandler} />
            <div className={s.br} />
            <p>Фотографии</p>
            <input type="file" multiple onChange={onChangeFileHandler} />
            <div className={s.br} />
            <Button onClick={onClickButtonHandler}>Создать</Button>
          </div>
        )
      }
    </Container>
  );
};

export default AdvertisementCreate;
