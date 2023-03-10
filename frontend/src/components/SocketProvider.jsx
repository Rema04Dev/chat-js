import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import SocketContext from '../contexts/SocketContext';
import * as messagesActions from '../store/slices/messagesSlice';
import * as channelsActions from '../store/slices/channelsSlice';

const SocketProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  const promisifySocket = (event, data) => new Promise((resolve) => {
    socket.emit(event, data, (response) => {
      if (response?.status === 'ok') {
        resolve(response.data);
      }
    });
  });

  const socketApi = {
    addMessage: (data) => promisifySocket('newMessage', data),
    addChannel: (data) => promisifySocket('newChannel', data),
    renameChannel: (data) => promisifySocket('renameChannel', data),
    removeChannel: (data) => promisifySocket('removeChannel', data),
  };

  socket.on('newMessage', (message) => {
    dispatch(messagesActions.addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    dispatch(channelsActions.addChannel(channel));
  });
  socket.on('renameChannel', (channelName) => {
    dispatch(channelsActions.renameChannel(channelName));
  });
  socket.on('removeChannel', (channelId) => {
    dispatch(channelsActions.removeChannel(channelId));
  });

  const socketValue = useMemo(() => ({ socketApi }), []);

  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
