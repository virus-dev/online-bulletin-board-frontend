import React from 'react';
import Header from 'Components/Header/Header';
import Loader from 'Components/storybook/Loader/Loader';

interface PageLoadingProps {
  withoutHeader: boolean,
}

const PageLoading: React.FC<PageLoadingProps> = ({ withoutHeader }) => (
  <>
    {!withoutHeader && <Header />}
    <Loader size="350px" />
  </>
);

export default PageLoading;
