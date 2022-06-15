import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import advertisementsReducer from 'Store/advertisements/advertisementsSlice';
import { fetchAllAdvertisements } from 'Store/advertisements/advertisementsAsyncActions';
import requestGetAllAdvertisements, { AdvertisementsGetAllReqParams } from 'Packages/api/rest/advertisements/requestGetAllAdvertisements';
import AdvertisementsRibbon from './AdvertisementsRibbon';

jest.mock('Packages/api/rest/advertisements/requestGetAllAdvertisements');

const response = {
  data: [
    {
      title: 'Микроволновка',
      price: 8000,
      id: 183,
      updatedAt: '2022-06-06T15:47:10.476Z',
      advertisementImages: [
        { imageUrl: 'https://i.ibb.co/7Vj8q8C/77d46d28c75f.jpg' },
      ],
    },
    {
      title: 'sdzsd',
      price: 1231,
      id: 181,
      updatedAt: '2022-05-18T19:46:49.154Z',
      advertisementImages: [],
    },
  ],
};

const params: AdvertisementsGetAllReqParams = {
  limit: 2,
  page: 1,
  brandId: 1,
  categoryId: 1,
};

describe('AdvertisementsRibbon', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  test('С сервера прилетает 2 объяления и надо убедиться, что они оба отобразятся', async () => {
    (requestGetAllAdvertisements as jest.Mock).mockResolvedValue(response);
    const store = configureStore({
      reducer: combineReducers({
        advertisements: advertisementsReducer,
      }),
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <AdvertisementsRibbon />
        </Provider>
      </BrowserRouter>,
    );

    store.dispatch(fetchAllAdvertisements({ params, prevAdvertisements: [] }));

    const advertisementItems = await screen.findAllByTestId('advertisementItem');
    expect(advertisementItems.length).toBe(2);
  });

  test('С сервера не прилетают объекты и мы не отображаем их', async () => {
    (requestGetAllAdvertisements as jest.Mock).mockResolvedValue({ data: [] });
    const store = configureStore({
      reducer: combineReducers({
        advertisements: advertisementsReducer,
      }),
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <AdvertisementsRibbon />
        </Provider>
      </BrowserRouter>,
    );

    store.dispatch(fetchAllAdvertisements({ params, prevAdvertisements: [] }));

    const advertisementItems = await screen.queryAllByTestId('advertisementItem');
    expect(advertisementItems.length).toBe(0);
  });
});
