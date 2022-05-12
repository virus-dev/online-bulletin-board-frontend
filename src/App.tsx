import React from 'react';
import ErrorBoundary from 'Components/ErrorBoundary/ErrorBoundary';
import useWebSocket from './hooks/useWebSocket';
import AppRouter from './pages/AppRouter';
import SocketContext from './context/SocketContext';

const App: React.FC = () => {
  const socket = useWebSocket();

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
