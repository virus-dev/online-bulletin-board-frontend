import React, { useMemo } from 'react';
import Select from 'Components/storybook/Select/Select';
import { selectorCategoriesData } from 'Store/categories/categoriesSelectors';
import { useAppSelector } from 'Hooks/redux';
import { selectorBrandsData } from 'Store/brands/brandsSelectors';

import s from './Filters.module.scss';

interface FiltersProps {
  onChange: (value: unknown, field: string) => void,
  categoryId: number,
  withoutSort?: boolean,
}

const Filters: React.FC<FiltersProps> = ({ onChange, categoryId, withoutSort }) => {
  const dataCategories = useAppSelector(selectorCategoriesData);
  const dataBrands = useAppSelector(selectorBrandsData);

  const optionsBrands = useMemo(() => ([
    { value: 0, mnemonic: 'Все бренды' },
    ...dataBrands.map(({ id, name }) => ({ value: id, mnemonic: name })),
  ]), [dataBrands]);

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
      {!withoutSort && (
        <Select
          options={optionsSorts}
          onChange={(val) => onChange(val, 'sort')}
          placeholder="Выберите сортировку"
        />
      )}
    </div>
  );
};

export default Filters;
