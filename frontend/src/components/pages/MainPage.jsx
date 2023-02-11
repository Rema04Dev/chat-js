import { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { io } from 'socket.io-client';
import axios from 'axios';
import routes from '../../utils/routes';
import AuthContext from '../../contexts/AuthContext';
import {
    channelsFethced,
    setCurrentChannelId,
    addChannel,
    removeChannel
} from '../../store/slices/channelsSlice';
import { messagesFetched, addMessage } from '../../store/slices/messagesSlice';

import {
    Container, Row, Col,
    Form,
    ButtonGroup, Button, Dropdown,
} from 'react-bootstrap';
import { Plus, ArrowRight } from 'react-bootstrap-icons';
import Header from '../Header';
import AddModal from '../modals/AddModal';
import RemoveModal from '../modals/RemoveModal';
const formatMessage = (text) => text.trim();
const socket = io.connect('http://localhost:3000')
// const socket = io.connect('http://localhost:5001')


const MainPage = () => {
    // useEffect(() => {
    //     const createUser = async () => {
    //         await axios.post('/api/v1/signup', { username: 'ramon04', password: 'qwerty' }).then((response) => {
    //             console.log(response.data); // => { token: ..., username: 'newuser' }
    //         });
    //         await axios.post('/api/v1/signup', { username: 'uliiapopova', password: 'qwerty1' }).then((response) => {
    //             console.log(response.data); // => { token: ..., username: 'newuser' }
    //         });
    //     }
    //     createUser();
    // }, []);

    // MODALS
    const [dropDownId, setDropDownId] = useState(null);
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

    // Store
    const { channels, currentChannelId } = useSelector(state => state.channels);
    const messages = useSelector(state => state.messages.messages);
    const dispatch = useDispatch();

    // AuthContext
    const { user } = useContext(AuthContext);
    const { username, token } = user;

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
        // dispatch(addMessage(formattedMessage));
        setMessage('');
    }

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(routes.dataPath(), {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const data = await response.data;
            dispatch(channelsFethced(data.channels))
            dispatch(messagesFetched(data.messages))
            // console.log(channels);
            // console.log(messages)
        };
        getData();
    }, [socket]);

    // SOCKET SUBSCRIPTION

    // subscribe new messages
    useEffect(() => {
        socket.on('newMessage', (data) => {
            dispatch(addMessage(data));
        })
    }, [socket]);

    // subscribe new channel
    useEffect(() => {
        socket.on('newChannel', (channel) => {
            dispatch(addChannel(channel))
        });
    }, [socket]);

    // subscribe remove channel
    useEffect(() => {
        socket.on('removeChannel', (id) => {
            dispatch(removeChannel(id))
        })
    }, [socket]);

    const renderChannels = () => {
        if (channels.length === 0) {
            return <span>Каналов нет</span>
        }
        return channels.map(({ id, name, removable }) => {
            const channelCSS = cn('btn', {
                'btn-secondary': id === currentChannelId,
                'btn-outline-secondary': id !== currentChannelId
            })
            if (!removable) {
                return <li key={id} className="nav-item w-100">
                    <button
                        onClick={() => dispatch(setCurrentChannelId(id))}
                        type="button"
                        className={`w-100 text-start rounded-0 ${channelCSS}`}>
                        <span className="me-1">#</span>{name}
                    </button>
                </li>
            }
            return <li key={id} className="nav-item w-100">
                <div role="group" className="d-flex dropdown btn-group">
                    <Dropdown as={ButtonGroup} className="w-100">
                        <Button
                            onClick={() => dispatch(setCurrentChannelId(id))}
                            type="button"
                            variant="outline-secondary"
                            className={`w-100 text-start rounded-0 ${channelCSS}`}>
                            <span className="me-1">#</span>{name}
                        </Button>

                        <Dropdown.Toggle split variant="outline-secondary" id="dropdown-split-basic" />

                        <Dropdown.Menu>
                            <Dropdown.Item>Переименовать</Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => handleShowRemoveModal(id)}>
                                Удалить
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </li>
        })
    }

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
            <AddModal
                show={showAddModal}
                handleClose={handleCloseAddModal} />
            <RemoveModal
                show={showRemoveModal}
                handleClose={handleCloseRemove}
                channelId={dropDownId} />
            <Header />
            <Container className='h-100 my-4 overflow-hidden rounded shadow'>
                <Row className='h-100 bg-white flex-md-row'>
                    <Col className='col-4 col-md-2 border-end pt-5 px-0 bg-light'>
                        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                            <span>Каналы</span>
                            <button type="button" className="p-0 text-primary btn btn-group-vertical">
                                <Plus onClick={handleShowAddModal} />
                            </button>
                        </div>
                        <ul className="nav flex-column nav-pills nav-fill px-2">
                            {renderChannels()}
                        </ul>
                    </Col>
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

        </>
    )
}

export default MainPage