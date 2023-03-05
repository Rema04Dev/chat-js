import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import SocketContext from '../contexts/SocketContext';
import * as messagesActions from '../store/slices/messagesSlice';
import * as channelsActions from '../store/slices/channelsSlice';

const SocketProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

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

  const addMessage = (message) => new Promise((resolve, reject) => {
    socket.emit('newMessage', message, (err, response) => {
      if (err) {
        reject(err);
      }
      if (response?.status === 'ok') {
        resolve(response.data);
      }
    });
  });

  // const addChannel = (channel) => {
  //   socket.emit('newChannels', channel, (response) => {
  //     if (response.status === 'ok') {
  //       const { id } = response.data;
  //       dispatch(channelsActions.setCurrentChannelId(id));
  //     }
  //   });
  // };

  const addChannel = (channel) => new Promise((resolve, reject) => {
    socket.emit('newChannel', channel, (err, response) => {
      if (err) {
        reject(err);
      }
      if (response?.status === 'ok') {
        // const { id } = response.data;
        // resolve(dispatch(channelsActions.setCurrentChannelId(id)));
        resolve(response.data);
      }
      reject(err);
    });
  });

  const renameChannel = (channelName) => {
    socket.emit('renameChannel', channelName, (response) => {
      if (response.status === 'ok') {
        console.log(response.status);
      }
    });
  };

  const removeChannel = (channelId) => {
    socket.emit('removeChannel', { id: channelId }, (response) => {
      if (response.status === 'ok') {
        console.log(response.status);
      }
    });
  };

  const socketValue = useMemo(() => ({
    addMessage, addChannel, renameChannel, removeChannel,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
