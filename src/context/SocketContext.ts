import { createContext } from 'react';
import { SocketContext as ISocketContext } from '../models/SocketContext';

const initialState: ISocketContext = {
  socket: null,
  isConnected: false,
  setIsConnected: null,
};

const SocketContext = createContext(initialState);

export default SocketContext;
