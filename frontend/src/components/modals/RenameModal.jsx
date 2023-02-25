import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import notification from '../../utils/notify';
import { hideModal } from '../../store/slices/modalsSlice';
import useSocket from '../../hooks/useSocket.hook';
import ErrorMessage from '../ErrorMessage';

const RenameModal = () => {
  const channels = useSelector((state) => state.channels.channels);
  const channelId = useSelector((state) => state.modals.channelId);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { renameChannel } = useSocket();
  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: channels.find((channel) => channel.id === channelId).name,
    },

    validationSchema: Yup.object({
      name: Yup
        .string()
        .min(3, t('renameModal.validation.length'))
        .notOneOf(channels.map((channel) => channel.name), t('renameModal.validation.unique'))
        .required(t('renameModal.validation.required')),
    }),

    onSubmit: (values) => {
      const cleanedName = leoProfanity.clean(values.name);
      renameChannel({ id: channelId, name: cleanedName });
      dispatch(hideModal());
      notification.rename(t('renameModal.success'));
    },
  });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>{t('renameModal.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Control
              value={formik.values.name}
              onChange={formik.handleChange}
              ref={inputEl}
              aria-label={t('renameModal.name')}
              name="name"
              type="text"
              autoFocus
              autoComplete="off"
              isInvalid={formik.errors.name && formik.touched.name}
            />
            <Form.Label className="visually-hidden">
              {t('renameModal.name')}
            </Form.Label>
            {
              formik.errors.name
              && formik.touched.name
              && <ErrorMessage message={formik.errors.name} />
            }
          </Form.Group>
          <div>
            <Button
              className="m-1"
              role="button"
              variant="secondary"
              onClick={() => dispatch(hideModal())}
            >
              {t('renameModal.cancel')}
            </Button>
            <Button
              className="m-1"
              variant="primary"
              role="button"
              type="submit"
            >
              {t('renameModal.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
