export interface SocketContext {
  socket: React.MutableRefObject<WebSocket | null> | null,
  isConnected: boolean,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>> | null,
}
