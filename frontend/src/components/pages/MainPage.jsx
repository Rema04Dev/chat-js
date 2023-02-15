import { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { io } from 'socket.io-client';
import axios from 'axios';
import routes from '../../utils/routes';
import AuthContext from '../../contexts/AuthContext';

import { addMessage } from '../../store/slices/messagesSlice';

import {
    Container, Row, Col,
    Form,
    ButtonGroup, Button, Dropdown,
} from 'react-bootstrap';
import { Plus, ArrowRight } from 'react-bootstrap-icons';
import AddModal from '../modals/AddModal';
import RemoveModal from '../modals/RemoveModal';
import RenameModal from '../modals/RenameModal';
import fetchData from '../../store/slices/fetchData';
import { ToastContainer } from 'react-toastify';
import Header from '../Header';
import Channels from '../Channels';

const formatMessage = (text) => text.trim();
const socket = io.connect('http://localhost:3000')

const MainPage = () => {
    // MODALS
    const [dropDownId, setDropDownId] = useState(null);
    const [renameId, setRenameId] = useState(null);
    // AddModal
    const [showAddModal, setAddShow] = useState(false);
    const handleCloseAddModal = () => setAddShow(false);
    const handleShowAddModal = () => setAddShow(true);

    // RemoveModal
    const [showRemoveModal, setRemove] = useState(false);
    const handleCloseRemove = () => setRemove(false);
    const handleShowRemoveModal = (id) => {
        setRemove(true)
        setDropDownId(id)
    };

    // RenameModal
    const [showRenameModal, setRename] = useState(false);
    const handleCloseRenameModal = () => setRename(false);
    const handleShowRenameModal = (id) => {
        setRename(true);
        setRenameId(id);
    }
    // Store
    const { channels, currentChannelId } = useSelector(state => state.channels)
    const messages = useSelector(state => state.messages.messages);
    const dispatch = useDispatch();

    // AuthContext
    const { user, getAuthHeaders } = useContext(AuthContext);
    const { username } = user;

    // Chat Form
    const [message, setMessage] = useState('');
    const handleChange = ({ target: { value } }) => setMessage(value);
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const formattedMessage = {
            body: formatMessage(message),
            channelId: currentChannelId,
            username: username
        }
        if (!formattedMessage.body) return false;

        socket.emit('newMessage', formattedMessage);
        setMessage('');
    }

    useEffect(() => {
        const getData = async () => {
            const headers = getAuthHeaders()
            await dispatch(fetchData(headers))
        }
        getData()
    }, [dispatch]);

    // SOCKET SUBSCRIPTION

    // subscribe new messages
    useEffect(() => {
        socket.on('newMessage', (data) => {
            dispatch(addMessage(data));
        })
    }, [socket]);

    const renderMessages = () => {
        if (messages.length === 0) {
            return <span>Сообщений пока нет</span>
        }

        return messages.map(({ id, body, username }) => {
            return <div key={id} className="text-break mb-2"><b>{username}</b>: {body}</div>
        })
    }

    return (
        <>
            {/* <AddModal
                show={showAddModal}
                handleClose={handleCloseAddModal} />
            <RemoveModal
                show={showRemoveModal}
                handleClose={handleCloseRemove}
                channelId={dropDownId} />
            <RenameModal
                show={showRenameModal}
                handleClose={handleCloseRenameModal}
                channelId={renameId} /> */}
            <Header />
            <Container className='h-100 my-4 overflow-hidden rounded shadow'>
                <Row className='h-100 bg-white flex-md-row'>
                    <Channels />
                    <Col className='p-0 h-100"'>
                        <div className="d-flex flex-column h-100"><div className="bg-light mb-4 p-3 shadow-sm small">
                            <p className="m-0">
                                <b># random</b>
                            </p>
                            <span className="text-muted">{messages.length} сообщение</span>
                        </div>
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
                </Row>
            </Container>
            <ToastContainer
                position="bottom-left"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
            />
        </>
    )
}

export default MainPage