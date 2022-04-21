import React, { useEffect, useRef, useState } from 'react';

const Socket: React.FC = () => {
  const socket = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:5000');

    socket.current.onopen = () => {
      setIsConnected(true);
    };

    socket.current.onmessage = () => {
      console.log('onmessage');
    };

    socket.current.onclose = () => {
      setIsConnected(false);
    };

    socket.current.onerror = () => {
      console.log('Произошла ошибка при подключении к WebSocket');
    };
  }, []);

  return (
    <div>dawdawdawd</div>
  );
};

export default WebSocket;
