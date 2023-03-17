import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Form, Button, Modal, FormText,
} from 'react-bootstrap';
import * as Yup from 'yup';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { hideModal } from '../../store/slices/modalsSlice';
import * as channelsActions from '../../store/slices/channelsSlice';

import useSocket from '../../hooks/useSocket.hook';
import CustomSpinner from '../skeletons/CustomSpinner';

const AddModal = () => {
  const channels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { socketApi } = useSocket();
  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },

    validationSchema: Yup.object({
      name: Yup
        .string()
        .min(3, t('addModal.validation.length'))
        .notOneOf(channels.map((channel) => channel.name), t('addModal.validation.unique'))
        .required(t('addModal.validation.required')),
    }),

    onSubmit: async (values) => {
      const cleanedName = leoProfanity.clean(values.name);
      const channelData = {
        name: cleanedName,
        removable: true,
      };

      try {
        const response = await socketApi.addChannel(channelData);
        dispatch(channelsActions.setCurrentChannelId(response.id));
        dispatch(hideModal());
        toast.success(t('addModal.success'), { icon: '🚀' });
      } catch (error) {
        toast.error(t('errors.unknown'));
      }
    },
  });

  return (
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
              ref={inputEl}
              name="name"
              type="text"
              autoFocus
              autoComplete="off"
              isInvalid={formik.errors.name && formik.touched.name}
            />
            {
              formik.errors.name
              && formik.touched.name
              && <FormText className="feedback text-danger mt-3">{formik.errors.name}</FormText>
            }
            <Form.Label className="visually-hidden">
              {t('addModal.channelName')}
            </Form.Label>
          </Form.Group>
          <Button
            role="button"
            className="m-1"
            variant="secondary"
            onClick={() => dispatch(hideModal())}
          >
            {t('addModal.cancel')}
          </Button>
          <Button
            role="button"
            className="m-1"
            variant="primary"
            type="submit"
          >
            { formik.isSubmitting
              ? <CustomSpinner size="sm" />
              : null }
            {t('addModal.send')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
