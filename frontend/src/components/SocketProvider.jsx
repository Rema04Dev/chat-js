import { io } from 'socket.io-client';
import SocketContext from '../contexts/SocketContext';
import { addMessage } from '../store/slices/messagesSlice';
import { addChannel, renameChannel, removeChannel } from '../store/slices/channelsSlice';
import { useDispatch } from 'react-redux';

const SocketProvider = ({ children }) => {
    const socket = io.connect('http://localhost:3000');
    const dispatch = useDispatch();

    const message = {
        listen: () => {
            socket.on('newMessage', (data) => {
                dispatch(addMessage(data))
            })
        },
        send: (data) => {
            socket.emit('newMessage', data)
            dispatch(addMessage(data))
        }
    };

    const channel = {
        add: (channel) => {
            socket.emit('newChannel', channel);
            dispatch(addChannel(channel));
        },
        rename: (newChannelName) => {
            socket.emit('renameChannel', newChannelName);
            dispatch(renameChannel(newChannelName));
        },
        remove: (channelId) => {
            socket.emit('removeChannel', channelId);
            dispatch(removeChannel(channelId));
        }
    }
    return (
        <SocketContext.Provider value={{ message, channel }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;