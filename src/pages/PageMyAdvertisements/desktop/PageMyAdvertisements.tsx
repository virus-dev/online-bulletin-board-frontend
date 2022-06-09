import React, { useEffect } from 'react';
import AdvertisementsRibbon from 'Components/AdvertisementsRibbon/AdvertisementsRibbon';
import Header from 'Components/Header/Header';
import Container from 'Storybook/Container/Container';
import { useAppDispatch } from 'Hooks/redux';
import { fetchAllAdvertisements } from 'Store/advertisements/advertisementsAsyncActions';

import s from './PageMyAdvertisements.module.scss';

const PageMyAdvertisements = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllAdvertisements({
      params: {
        limit: 20,
        page: 1,
        myAdvertisements: true,
      },
      prevAdvertisements: [],
    }));
  }, [dispatch]);

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
