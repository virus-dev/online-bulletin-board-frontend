import React from 'react';
import useWebSocket from './hooks/useWebSocket';
import AppRouter from './pages/AppRouter';
import SocketContext from './context/SocketContext';

const App: React.FC = () => {
  const socket = useWebSocket();

  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <AppRouter />
      </div>
    </SocketContext.Provider>
  );
};

export default App;
