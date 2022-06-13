import React from 'react';
import Advertisement from 'Components/Advertisement/Advertisement';
import Header from 'Components/Header/Header';
import useIsAuth from 'Hooks/useIsAuth';

const PageAdvertisement = () => {
  const { isLoading } = useIsAuth();

  const innerContent = () => {
    if (isLoading) {
      return <div>Loading</div>;
    }

    return <Advertisement />;
  };

  return (
    <>
      <Header />
      {innerContent()}
    </>
  );
};

export default PageAdvertisement;
