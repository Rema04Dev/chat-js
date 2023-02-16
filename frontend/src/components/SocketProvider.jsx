import { io } from 'socket.io-client';
import SocketContext from '../contexts/SocketContext';
import { addMessage } from '../store/slices/messagesSlice'
import { useDispatch } from 'react-redux'
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
    }
    return (
        <SocketContext.Provider value={{ message }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider