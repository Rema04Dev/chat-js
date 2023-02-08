import { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { channelsFethced } from '../../store/slices/channelsSlice'
import axios from 'axios';
import routes from '../../utils/routes';
import AuthContext from '../../contexts/AuthContext';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Plus, ArrowRight } from 'react-bootstrap-icons';
import Header from '../Header';

const MainPage = () => {
    const channels = useSelector(state => state.channels.channels)
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const getChannels = async () => {
            const response = await axios.get(routes.dataPath(), {
                headers: { 'Authorization': `Bearer ${user.token}` }
            })
            const data = await response.data;
            dispatch(channelsFethced(data.channels))
        };

        getChannels();
    }, []);
    const renderChannels = () => {
        if (channels.length === 0) {
            return <span>Каналов нет</span>
        }
        return channels.map(({ id, name }) => (
            <li key={id} className="nav-item w-100">
                <button type="button" className="w-100 text-start rounded-0 btn btn-outline-secondary">
                    <span className="me-1">#</span>{name}
                </button>
            </li>
        ))
    }
    return (
        <>
            <Header />
            <Container className='h-100 my-4 overflow-hidden rounded shadow'>
                <Row className='h-100 bg-white flex-md-row'>
                    <Col className='col-4 col-md-2 border-end pt-5 px-0 bg-light'>
                        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                            <span>Каналы</span>
                            <button type="button" className="p-0 text-primary btn btn-group-vertical">
                                <Plus />
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
                            <span className="text-muted">1 сообщение</span>
                        </div>
                            <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                                <div className="text-break mb-2"><b>admin</b>: Проект задница</div>
                            </div>
                            <div className="mt-auto px-5 py-3">
                                <Form noValidate="" className="py-1 border rounded-2">
                                    <Form.Group className='input-group has-validation'>
                                        <Form.Control
                                            aria-label='Новое сообщение'
                                            className='border-0 p-0 ps-2 form-control'
                                            name='body'
                                            placeholder='Введите сообщение...' />
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