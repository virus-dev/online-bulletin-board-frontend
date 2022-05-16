import React, { useEffect, useMemo } from 'react';
import Select from 'Components/storybook/Select/Select';
import BrandsAPI from 'Services/BrandsAPI';
import CategoriesAPI from 'Services/CategoriesAPI';

import s from './Filters.module.scss';

interface FiltersProps {
  onChange: (value: unknown, field: string) => void,
  categoryId: number,
}

const Filters: React.FC<FiltersProps> = ({ onChange, categoryId }) => {
  const {
    data: dataCategories = [],
  } = CategoriesAPI.useGetCategoriesQuery();

  const [trigger, { data: dataBrands = [] }] = BrandsAPI.useLazyGetBrandsQuery();

  const optionsBrands = useMemo(() => ([
    { value: 0, mnemonic: 'Все бренды' },
    ...dataBrands.map(({ id, name }) => ({ value: id, mnemonic: name })),
  ]), [dataBrands]);

  useEffect(() => {
    trigger(categoryId);
  }, [categoryId, trigger]);

  const optionsCategories = useMemo(() => ([
    { value: 0, mnemonic: 'Все категории' },
    ...dataCategories.map(({ id, name }) => ({ value: id, mnemonic: name })),
  ]), [dataCategories]);

  const onChangeSelectCategoriesHandler = (val: unknown) => {
    onChange(val, 'categoryId');
    onChange(0, 'brandId');
  };

  const optionsSorts = useMemo(() => ([
    {
      value: 'updatedAt.DESC',
      mnemonic: 'Сначала новые',
    },
    {
      value: 'updatedAt.ASC',
      mnemonic: 'Сначала старые',
    },
    {
      value: 'price.DESC',
      mnemonic: 'Сначала дорогие',
    },
    {
      value: 'price.ASC',
      mnemonic: 'Сначала дешевые',
    },
  ]), []);

  return (
    <div className={s.selects}>
      <Select
        options={optionsCategories}
        onChange={onChangeSelectCategoriesHandler}
        placeholder="Выберите категорию"
      />
      <Select
        options={optionsBrands}
        onChange={(val) => onChange(val, 'brandId')}
        placeholder={!categoryId ? 'Сначала выберите категорию' : 'Выберите вариант'}
      />
      <Select
        options={optionsSorts}
        onChange={(val) => onChange(val, 'sort')}
        placeholder="Выберите сортировку"
      />
    </div>
  );
};

export default Filters;
