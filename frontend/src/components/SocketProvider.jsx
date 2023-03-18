import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import SocketContext from '../contexts/SocketContext';
import * as messagesActions from '../store/slices/messagesSlice';
import * as channelsActions from '../store/slices/channelsSlice';

const SocketProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  const promisifySocket = useCallback((event, data) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit(event, data, (err, response) => {
      if (err) {
        reject(err);
      }
      if (response?.status === 'ok') {
        resolve(response.data);
      }
    });
  }), [socket]);

  const socketApi = useMemo(() => ({
    addMessage: (data) => promisifySocket('newMessage', data),
    addChannel: (data) => promisifySocket('newChannel', data),
    renameChannel: (data) => promisifySocket('renameChannel', data),
    removeChannel: (data) => promisifySocket('removeChannel', data),
  }), [promisifySocket]);

  useEffect(() => {
    const handleNewMessage = (message) => {
      dispatch(messagesActions.addMessage(message));
    };
    const handleNewChannel = (channel) => {
      dispatch(channelsActions.addChannel(channel));
    };
    const handleRenameChannel = (channelName) => {
      dispatch(channelsActions.renameChannel(channelName));
    };
    const handleRemoveChannel = (channelId) => {
      dispatch(channelsActions.removeChannel(channelId));
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('renameChannel', handleRenameChannel);
    socket.on('removeChannel', handleRemoveChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('renameChannel', handleRenameChannel);
      socket.off('removeChannel', handleRemoveChannel);
    };
  }, [socket, dispatch]);

  const socketValue = useMemo(() => ({ socketApi }), [socketApi]);

  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
