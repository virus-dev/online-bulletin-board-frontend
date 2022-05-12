import React from 'react';
import AdvertisementUnloginContainer from 'Components/AdvertisementUnloginContainer/AdvertisementUnloginContainer';
import AdvertisementLoginContainer from 'Components/AdvertisementLoginContainer/AdvertisementLoginContainer';
import Header from 'Components/Header/Header';
import useIsAuth from '../../hooks/useIsAuth';

const AdvertisementPage = () => {
  const { isAuth, isLoading } = useIsAuth();

  const innerContent = () => {
    if (isLoading) {
      return <div>Loading</div>;
    }

    if (isAuth) {
      return <AdvertisementLoginContainer />;
    }

    return <AdvertisementUnloginContainer />;
  };

  return (
    <>
      <Header />
      {innerContent()}
    </>
  );
};

export default AdvertisementPage;
