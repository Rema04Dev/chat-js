import { Form, Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import notification from '../../utils/notify';
import { useTranslation } from 'react-i18next'

const socket = io.connect('http://localhost:3000')
const AddModal = ({ show, handleClose }) => {
    const channels = useSelector(state => state.channels.channels)
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: {
            name: '',
        },

        validationSchema: Yup.object({
            name: Yup
                .string()
                .min(3, 'Название должно быть не менее 3 символов')
                .max(20, 'Название не должно превышать 20 символов')
                .notOneOf(channels.map((channel) => channel.name), `Канал уже существует`)
                .required('Обязательное поле')
        }),

        onSubmit: (values) => {
            socket.emit('newChannel', values);
            handleClose();
            notification.add(t('addModal.success'))
        }
    })

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить канал</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                name="name"
                                type="text"
                                autoFocus
                                autoComplete='off'
                            />
                            {
                                formik.errors.name &&
                                <p className='feedback text-danger'>{formik.errors.name}</p>
                            }
                        </Form.Group>
                        <div>
                            <Button variant="secondary" onClick={handleClose}>
                                Отменить
                            </Button>
                            <Button variant="primary" type='submit' onClick={formik.handleSubmit}>
                                Отправить
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddModal;