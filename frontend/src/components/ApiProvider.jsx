import { useDispatch } from 'react-redux';
import { useMemo, useEffect } from 'react';
import SocketContext from '../contexts/SocketContext';
import * as messagesActions from '../store/slices/messagesSlice';
import * as channelsActions from '../store/slices/channelsSlice';

const promisifySocket = (socket, event, data) => new Promise((resolve, reject) => {
  socket.timeout(5000).emit(event, data, (err, response) => {
    if (err) {
      reject(err);
    }
    if (response?.status === 'ok') {
      resolve(response.data);
    }
  });
});

const ApiProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  const socketApi = useMemo(() => ({
    addMessage: (data) => promisifySocket(socket, 'newMessage', data),
    addChannel: (data) => promisifySocket(socket, 'newChannel', data),
    renameChannel: (data) => promisifySocket(socket, 'renameChannel', data),
    removeChannel: (data) => promisifySocket(socket, 'removeChannel', data),
  }), [socket]);

  useEffect(() => {
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
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={socketApi}>
      {children}
    </SocketContext.Provider>
  );
};

export default ApiProvider;
