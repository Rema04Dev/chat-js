import { Col, Form } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useContext } from 'react'
import AuthContext from '../contexts/AuthContext';
import { io } from 'socket.io-client';
import { addMessage } from '../store/slices/messagesSlice';
import MessagesHeader from './MessagesHeader';
const socket = io.connect('http://localhost:3000')
const formatMessage = (text) => text.trim();

const Messages = () => {
    const { user } = useContext(AuthContext);
    const { currentChannelId } = useSelector(state => state.channels)

    const [message, setMessage] = useState('');
    const messages = useSelector(state => state.messages.messages);
    const dispatch = useDispatch();
    const handleChange = ({ target: { value } }) => setMessage(value);
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const formattedMessage = {
            body: formatMessage(message),
            channelId: currentChannelId,
            username: user.username
        }
        if (!formattedMessage.body) return false;

        socket.emit('newMessage', formattedMessage);
        setMessage('');
    }

    const renderMessages = () => {
        return messages.map(({ id, body, username }) => {
            return <div key={id} className="text-break mb-2"><b>{username}</b>: {body}</div>
        })
    }

    useEffect(() => {
        socket.on('newMessage', (data) => {
            dispatch(addMessage(data));
        })
    }, [socket]);


    return (
        <Col className='p-0 h-100"'>
            <div className="d-flex flex-column h-100">
                <MessagesHeader />
                <div id="messages-box" className="chat-messages overflow-auto px-5" style={{ minHeight: '60vh' }}>
                    {renderMessages()}
                </div>
                <div className="mt-auto px-5 py-3">
                    <Form
                        onSubmit={handleSubmit}
                        noValidate=""
                        className="py-1 border rounded-2">
                        <Form.Group className='input-group has-validation'>
                            <Form.Control
                                value={message}
                                onChange={handleChange}
                                aria-label='Новое сообщение'
                                className='border-0 p-0 ps-2 form-control'
                                name='body'
                                placeholder='Введите сообщение...'
                                autoComplete='off' />
                            <button type="submit" disabled="" className="btn btn-group-vertical">
                                <ArrowRight />
                                <span className="visually-hidden">Отправить</span>
                            </button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </Col>
    )
}

export default Messages;