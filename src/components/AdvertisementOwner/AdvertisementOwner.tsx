import React from 'react';
import AdvertisementOwnerLoading from './components/AdvertisementOwnerLoading/AdvertisementOwnerLoading';
import AdvertisementOwnerSuccess from './components/AdvertisementOwnerSuccess/AdvertisementOwnerSuccess';

interface AdvertisementOwnerProps {
  userId: number | undefined | null,
}

const AdvertisementOwner: React.FC<AdvertisementOwnerProps> = ({ userId }) => (
  <div>
    {
      userId
        ? <AdvertisementOwnerSuccess userId={userId} />
        : <AdvertisementOwnerLoading />
    }
  </div>
);

export default AdvertisementOwner;
