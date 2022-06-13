import React, { useEffect, useRef } from 'react';
import Container from 'Storybook/Container/Container';
import { useAppSelector } from 'Hooks/redux';
import { selectorAdvertisements } from 'Store/advertisements/advertisementsSelectors';
import Loader from 'Components/storybook/Loader/Loader';
import AdvertisementItem from '../AdvertisementItem/AdvertisementItem';
import LoadTrigger from './LoadTrigger/LoadTrigger';

import s from './AdvertisementsRibbon.module.scss';

interface AdvertisementsRibbonProps {
  onScrollEnd?: () => void,
}

const AdvertisementsRibbon: React.FC<AdvertisementsRibbonProps> = ({
  onScrollEnd,
}) => {
  const {
    data,
    isLoading,
    adsAreOver,
  } = useAppSelector(selectorAdvertisements);

  const isLoadingRef = useRef(isLoading || false);
  const isRibbonOverRef = useRef(adsAreOver || false);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    isRibbonOverRef.current = adsAreOver;
  }, [adsAreOver]);

  const newOnScrollEnd = () => {
    // Ref нужен потому что дальше переменные замыкаются и становятся неактуальными
    if (!isLoadingRef.current && !isRibbonOverRef.current) {
      onScrollEnd?.();
    }
  };

  const content = () => {
    if (!isLoading && !data.length) {
      return <div className={s.noContent}>Ничего нету</div>;
    }

    return (
      <>
        <div className={s.advertisementsRibbon}>
          {data.map(({
            id,
            title,
            price,
            advertisementImages,
          }) => (
            <AdvertisementItem
              key={id}
              id={id}
              title={title}
              price={price}
              advertisementImages={advertisementImages}
            />
          ))}
        </div>
        {isLoading && !adsAreOver && (
          <div className={s.noContent}><Loader size="350px" /></div>
        )}
        {adsAreOver && (
          <div className={s.isRibbonOver}>Лента закончилась</div>
        )}
      </>
    );
  };

  return (
    <Container className={s.advertisementsContainer}>
      {content()}
      <LoadTrigger callback={newOnScrollEnd} />
    </Container>
  );
};

AdvertisementsRibbon.defaultProps = {
  onScrollEnd: undefined,
};

export default AdvertisementsRibbon;
