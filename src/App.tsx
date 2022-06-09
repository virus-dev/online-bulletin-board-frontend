import React from 'react';
import ErrorBoundary from 'Components/ErrorBoundary/ErrorBoundary';
import useWebSocket from 'Hooks/useWebSocket';
import SocketContext from 'Context/SocketContext';
import AppRouter from './pages/AppRouter';

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
