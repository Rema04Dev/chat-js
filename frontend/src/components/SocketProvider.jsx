import { io } from 'socket.io-client';
import SocketContext from '../contexts/SocketContext';
import { actions } from '../store/slices/messagesSlice';
import * as channelsActions from '../store/slices/channelsSlice';
import { useDispatch } from 'react-redux';
const SocketProvider = ({ children }) => {
    const socket = io();
    const dispatch = useDispatch();

    socket.on('newMessage', message => {
        dispatch(actions.addMessage(message))
    });
    socket.on('newChannel', channel => {
        dispatch(channelsActions.addChannel(channel))
    });
    socket.on('renameChannel', channelName => {
        dispatch(channelsActions.renameChannel(channelName))
    });
    socket.on('removeChannel', channelId => {
        dispatch(channelsActions.removeChannel(channelId))
    });

    const addMessage = (message) => {
        socket.emit('newMessage', message, (response) => {
            if (response.status === 'ok') {
                console.log(response.status);
            }
        })
    };

    const addChannel = (channel) => {
        socket.emit('newChannel', channel, (response) => {
            if (response.status === 'ok') {
                const { id } = response.data;
                dispatch(channelsActions.setCurrentChannelId(id))
            }
        })
    };

    const renameChannel = (channelName) => {
        socket.emit('renameChannel', channelName, response => {
            if (response.status === 'ok') {
                console.log(response.status)
            }
        })
    };

    const removeChannel = (channelId) => {
        socket.emit('removeChannel', { id: channelId }, response => {
            if (response.status === 'ok') {
                console.log(response.status);
            }
        })
    }

    return (
        <SocketContext.Provider value={{
            addMessage,
            addChannel,
            renameChannel,
            removeChannel
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;