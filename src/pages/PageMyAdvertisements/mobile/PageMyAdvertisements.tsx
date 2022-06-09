import React, { useEffect } from 'react';
import AdvertisementsRibbon from 'Components/AdvertisementsRibbon/AdvertisementsRibbon';
import Header from 'Components/Header/Header';
import Container from 'Storybook/Container/Container';
import { useDispatch } from 'react-redux';
import { fetchAllAdvertisements } from 'Store/advertisements/advertisementsAsyncActions';

import s from './PageMyAdvertisements.module.scss';

const PageMyAdvertisements = () => {
  const dispath = useDispatch();

  useEffect(() => {
    const params = {
      limit: 20,
      page: 1,
      myAdvertisements: true,
    };
    dispath(fetchAllAdvertisements({ params, prevAdvertisements: [] }));
  }, [dispath]);

  return (
    <>
      <Header />
      <Container>
        <h1 className={s.title}>Мои объявления</h1>
        <AdvertisementsRibbon />
      </Container>
    </>
  );
};

export default PageMyAdvertisements;
