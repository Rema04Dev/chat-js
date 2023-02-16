import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ArrowRight } from 'react-bootstrap-icons';
import useAuth from '../../../hooks/useAuth.hook';
import useSocket from '../../../hooks/useSocket.hook';

const MessagesForm = () => {
    const { user } = useAuth();
    const { message } = useSocket();
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
        onSubmit: async (values) => {
            const messageData = {
                body: values.body,
                channelId: currentChannelId,
                username: user.username
            }
            values.body = '';
            message.send(messageData)
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