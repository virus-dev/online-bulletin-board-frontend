import React from 'react';
import AdvertisementAPI from '../../services/AdvertisementAPI';
import AdvertisementItem from '../AdvertisementItem/AdvertisementItem';
import Container from '../storybook/Container/Container';
import { Advertisement } from '../../models/Advertisement';

import s from './AdvertisementsRibbon.module.scss';

interface AdvertisementsRibbonProps {
  data: Advertisement[] | undefined,
  isLoading: boolean,
}

const AdvertisementsRibbon: React.FC<AdvertisementsRibbonProps> = ({ data, isLoading }) => {
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
