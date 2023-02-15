import { useState, useContext } from 'react'
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ArrowRight } from 'react-bootstrap-icons';
import AuthContext from '../contexts/AuthContext';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:3000')

// const formatMessage = (text) => text.trim();

const MessagesForm = () => {
    const { user } = useContext(AuthContext);
    const { currentChannelId } = useSelector(state => state.channels)

    const formik = useFormik({
        initialValues: {
            body: '',
        },
        validationSchema: Yup.object({
            body: Yup
                .string()
                .required()
        }),
        onSubmit: (values) => {
            const message = {
                body: values.body,
                channelId: currentChannelId,
                username: user.username
            }
            socket.emit('newMessage', message);
            values.body = '';
        }
    })
    return (
        <div className="mt-auto px-5 py-3">
            <Form
                onSubmit={formik.handleSubmit}
                noValidate=""
                className="py-1 border rounded-2">
                <Form.Group className='input-group has-validation'>
                    <Form.Control
                        value={formik.values.body}
                        onChange={formik.handleChange}
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
    )
}

export default MessagesForm