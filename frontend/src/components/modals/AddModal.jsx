import { Form, Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../../store/slices/modalsSlice';
import notification from '../../utils/notify';
import { useTranslation } from 'react-i18next';
import useSocket from '../../hooks/useSocket.hook';

const AddModal = () => {
    const channels = useSelector(state => state.channels.channels);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { channel } = useSocket();
    const formik = useFormik({
        initialValues: {
            name: '',
        },

        validationSchema: Yup.object({
            name: Yup
                .string()
                .min(3, t('addModal.validation.length'))
                .notOneOf(channels.map((channel) => channel.name), 'addModal.validation.unique')
                .required('addModal.validation.required')
        }),

        onSubmit: (values) => {
            channel.add(values);
            dispatch(hideModal());
            notification.add(t('addModal.success'))
        }
    })

    return (
        <>
            <Modal show>
                <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
                    <Modal.Title>{t('addModal.addChannel')}</Modal.Title>
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
                            <Button variant="secondary" onClick={() => dispatch(hideModal())}>
                                {t('addModal.cancel')}
                            </Button>
                            <Button variant="primary" type='submit'>
                                {t('addModal.send')}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddModal;