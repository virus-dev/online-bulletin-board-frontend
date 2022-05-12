import { useEffect, useRef, useState } from 'react';
import UserApi from 'Services/UserApi';
import { messagesSlice } from 'Store/reducers/messagesSlice';
import { getCountUnreadMessages } from 'Store/actionCreators/messagesActionCreators';
import { useAppDispatch, useAppSelector } from './redux';
import useIsAuth from './useIsAuth';

const useWebSocket = () => {
  const dispath = useAppDispatch();
  const { isAuth } = useIsAuth();
  const { data: { id } = {} } = UserApi.useGetDataQuery();

  const {
    unreadMessages,
    chat,
    dialogs: { data: dialogs },
  } = useAppSelector(({ messages }) => messages);

  const socket = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const webSocketURL: string | undefined = process.env.REACT_APP_WS_URL;

  useEffect(() => {
    if (!isAuth) {
      return;
    }

    if (!webSocketURL) {
      return;
    }

    if (!socket.current) {
      socket.current = new WebSocket(webSocketURL);

      socket.current.onopen = () => {
        setIsConnected(true);
        const sendObj = {
          method: 'connection',
          userId: id,
          token: `Bearer ${localStorage.getItem('JWT')}`,
        };
        socket.current?.send(JSON.stringify(sendObj));
      };
    }

    socket.current.onmessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      const {
        pushMessage, updateDialog, youReadedMessage, yourMessageWasRead,
      } = messagesSlice.actions;

      switch (data.method) {
        case 'youSendMessage':
          if (chat.chatWithUserId === data.message.toUserId) {
            dispath(pushMessage(data.message));
          }
          if (dialogs.length) {
            dispath(updateDialog({
              message: data.message,
              isYouSendMessage: true,
            }));
          }
          dispath(getCountUnreadMessages());
          break;
        case 'toYouSendMessage':
          if (chat.chatWithUserId === data.message.fromUserId) {
            dispath(pushMessage(data.message));
          }
          if (dialogs.length) {
            dispath(updateDialog({
              message: data.message,
              isYouSendMessage: false,
            }));
          }
          dispath(getCountUnreadMessages());
          break;
        case 'youReadedMessage':
          dispath(youReadedMessage(data));
          break;
        case 'yourMessageWasRead':
          dispath(yourMessageWasRead(data));
          break;
        default:
          break;
      }
    };

    socket.current.onclose = () => {
      setIsConnected(false);
    };

    socket.current.onerror = () => {
      setIsConnected(false);
      console.log('Произошла ошибка при подключении к WebSocket');
    };
  }, [chat.chatWithUserId, dialogs.length, dispath, id, isAuth, webSocketURL]);

  if (!isAuth) {
    return {
      socket: null,
      isConnected: false,
      setIsConnected: null,
    };
  }

  return {
    socket,
    isConnected,
    setIsConnected,
  };
};

export default useWebSocket;
