import { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Plus, ArrowRight } from 'react-bootstrap-icons';
import Header from '../Header';

const MainPage = () => {
    const [channels, setChannels] = useState([
        { id: 1, title: 'general' },
        { id: 1, title: 'random' },
    ])

    const renderChannels = () => {
        return channels.map(({ id, title }) => (
            <li key={id} className="nav-item w-100">
                <button type="button" class="w-100 text-start rounded-0 btn btn-outline-secondary">
                    <span className="me-1">#</span>{title}
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
                        <div class="d-flex justify-content-between mb-2 ps-4 pe-2">
                            <span>Каналы</span>
                            <button type="button" class="p-0 text-primary btn btn-group-vertical">
                                <Plus />
                            </button>
                        </div>
                        <ul className="nav flex-column nav-pills nav-fill px-2">
                            {renderChannels()}
                        </ul>
                    </Col>
                    <Col className='p-0 h-100"'>
                        <div class="d-flex flex-column h-100"><div class="bg-light mb-4 p-3 shadow-sm small">
                            <p class="m-0">
                                <b># random</b>
                            </p>
                            <span class="text-muted">1 сообщение</span>
                        </div>
                            <div id="messages-box" class="chat-messages overflow-auto px-5 ">
                                <div class="text-break mb-2"><b>admin</b>: Проект задница</div>
                            </div>
                            <div class="mt-auto px-5 py-3">
                                <Form novalidate="" class="py-1 border rounded-2">

                                    <Form.Group className='input-group has-validation'>
                                        <Form.Control
                                            aria-label='Новое сообщение'
                                            className='border-0 p-0 ps-2 form-control'
                                            name='body'
                                            placeholder='Введите сообщение...' />
                                        <button type="submit" disabled="" class="btn btn-group-vertical">
                                            <ArrowRight />
                                            <span class="visually-hidden">Отправить</span>
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