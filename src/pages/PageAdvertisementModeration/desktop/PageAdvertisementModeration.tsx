import React, { useEffect } from 'react';
import AdvertisementsRibbon from 'Components/AdvertisementsRibbon/AdvertisementsRibbon';
import Header from 'Components/Header/Header';
import Container from 'Storybook/Container/Container';
import { useAppDispatch } from 'Hooks/redux';
import { fetchAllAdvertisements } from 'Store/advertisements/advertisementsAsyncActions';

const PageAdvertisementModeration = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllAdvertisements({
      params: {
        limit: 20,
        page: 1,
        moderation: true,
      },
      prevAdvertisements: [],
    }));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Container>
        <AdvertisementsRibbon />
      </Container>
    </div>
  );
};

export default PageAdvertisementModeration;
