import React from 'react';
import numberWithCommas from 'Utils/numberWithCommas';

import s from './Price.module.scss';

interface PriceProps {
  price: number,
}

const Price: React.FC<PriceProps> = ({ price }) => {
  const currentCurrency = '₽';
  const currentPrice = numberWithCommas(price);

  return (
    <div className={s.price}>{`${currentPrice} ${currentCurrency}`}</div>
  );
};

export default Price;
