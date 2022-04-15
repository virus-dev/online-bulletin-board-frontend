import React from 'react';
import AdvertisementAPI from '../../services/AdvertisementAPI';
import AdvertisementItem from '../AdvertisementItem/AdvertisementItem';
import Container from '../storybook/Container/Container';

import s from './AdvertisementsRibbon.module.scss';

const AdvertisementsRibbon = () => {
  const {
    data,
    isLoading,
  } = AdvertisementAPI.useGetAllQuery({ limit: 20, page: 1 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.length) {
    return <div>Ничего нету</div>;
  }

  return (
    <Container className={s.advertisementsContainer}>
      <div className={s.advertisementsRibbon}>
        {data.map(({ id, title, price }) => (
          <AdvertisementItem key={id} id={id} title={title} price={price} />
        ))}
      </div>
    </Container>
  );
};

export default AdvertisementsRibbon;
