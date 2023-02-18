import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import leoProfanity from 'leo-profanity';
import { ArrowRight } from 'react-bootstrap-icons';
import useAuth from '../../../hooks/useAuth.hook';
import useSocket from '../../../hooks/useSocket.hook';

const MessagesForm = () => {
    const { user } = useAuth();
    const { addMessage } = useSocket();
    const { currentChannelId } = useSelector(state => state.channels)
    const inputEl = useRef();

    useEffect(() => {
        inputEl.current.select();
    }, []);

    const formik = useFormik({
        initialValues: {
            body: '',
        },
        validationSchema: Yup.object({
            body: Yup
                .string()
                .required()
        }),
        onSubmit: async (values) => {
            const { body } = values;
            const cleanedMessage = leoProfanity.clean(body);

            const messageData = {
                body: cleanedMessage,
                channelId: currentChannelId,
                username: user.username
            }
            addMessage(messageData)
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
                        ref={inputEl}
                        autoFocus
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