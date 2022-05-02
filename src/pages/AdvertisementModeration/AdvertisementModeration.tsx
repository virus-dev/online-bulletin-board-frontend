import React from 'react';
import AdvertisementsRibbon from '../../components/AdvertisementsRibbon/AdvertisementsRibbon';
import Header from '../../components/Header/Header';
import Container from '../../components/storybook/Container/Container';
import { useAppSelector } from '../../hooks/redux';
import AdvertisementApi from '../../services/AdvertisementAPI';

import s from './AdvertisementModeration.module.scss';

const AdvertisementModeration: React.FC = () => {
  const advertisementSearch = useAppSelector(({ inputs }) => inputs.inputs.advertisementSearch);
  const {
    data,
    isLoading,
  } = AdvertisementApi.useGetAllOnModerationQuery({
    limit: 12,
    page: 1,
    title: advertisementSearch,
  });

  return (
    <div>
      <Header />
      <Container>
        <AdvertisementsRibbon data={data} isLoading={isLoading} />
      </Container>
    </div>
  );
};

export default AdvertisementModeration;
