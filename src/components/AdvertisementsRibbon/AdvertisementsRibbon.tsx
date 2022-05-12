import React from 'react';
import Container from 'Storybook/Container/Container';
import { Advertisement } from 'Models/Advertisement';
import AdvertisementItem from '../AdvertisementItem/AdvertisementItem';

import s from './AdvertisementsRibbon.module.scss';
import LoadTrigger from './LoadTrigger/LoadTrigger';

interface AdvertisementsRibbonProps {
  onScrollEnd?: () => void,
  data: Advertisement[] | undefined,
  isLoading: boolean,
}

const AdvertisementsRibbon: React.FC<AdvertisementsRibbonProps> = ({
  data,
  isLoading,
  onScrollEnd,
}) => {
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
      <LoadTrigger callback={onScrollEnd} />
    </Container>
  );
};

AdvertisementsRibbon.defaultProps = {
  onScrollEnd: undefined,
};

export default AdvertisementsRibbon;
