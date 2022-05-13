import React from 'react';
import Container from 'Storybook/Container/Container';
import { Advertisement } from 'Models/Advertisement';
import Loader from 'Components/storybook/Loader/Loader';
import AdvertisementItem from '../AdvertisementItem/AdvertisementItem';
import LoadTrigger from './LoadTrigger/LoadTrigger';

import s from './AdvertisementsRibbon.module.scss';

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
  const content = () => {
    if (isLoading) {
      return <div className={s.noContent}><Loader size="350px" /></div>;
    }

    if (!data || !data.length) {
      return <div className={s.noContent}>Ничего нету</div>;
    }

    return (
      <div className={s.advertisementsRibbon}>
        {data.map(({ id, title, price }) => (
          <AdvertisementItem key={id} id={id} title={title} price={price} />
        ))}
      </div>
    );
  };

  return (
    <Container className={s.advertisementsContainer}>
      {content()}
      <LoadTrigger callback={onScrollEnd} />
    </Container>
  );
};

AdvertisementsRibbon.defaultProps = {
  onScrollEnd: undefined,
};

export default AdvertisementsRibbon;
