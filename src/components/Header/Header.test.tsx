import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'Store/store';
import useIsAuth from 'Hooks/useIsAuth';
import Header from './Header';

jest.mock('Hooks/useIsAuth');

describe('Header', () => {
  test('Не авторизованый пользователь', () => {
    (useIsAuth as jest.Mock).mockReturnValue({
      isAuth: false,
      isLoading: false,
      isAuthOrIsLoading: false,
      isAdminRole: false,
      isModeratorRole: false,
      isUserRole: true,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );

    const linkEl = screen.getByTestId('headerAuthButton');
    expect(linkEl).toBeInTheDocument();
  });

  test('Авторизованый пользователь', () => {
    (useIsAuth as jest.Mock).mockReturnValue({
      isAuth: true,
      isLoading: false,
      isAuthOrIsLoading: false,
      isAdminRole: false,
      isModeratorRole: false,
      isUserRole: true,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );

    const profileIconLink = screen.getByTestId('headerIconProfile');
    expect(profileIconLink).toBeInTheDocument();
  });
});
