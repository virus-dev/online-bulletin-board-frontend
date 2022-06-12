import React, { useEffect } from 'react';
import ErrorBoundary from 'Components/ErrorBoundary/ErrorBoundary';
import useWebSocket from 'Hooks/useWebSocket';
import SocketContext from 'Context/SocketContext';
import { useAppDispatch } from 'Hooks/redux';
import { getData } from 'Store/user/userAsyncActions';
import { fetchCategories } from 'Store/categories/categoriesAsyncActions';
import AppRouter from './pages/AppRouter';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const socket = useWebSocket();

  useEffect(() => {
    dispatch(fetchCategories());
    const token = localStorage.getItem('JWT');
    if (token) {
      dispatch(getData(token));
    }
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <SocketContext.Provider value={socket}>
        <div className="App">
          <AppRouter />
        </div>
      </SocketContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
