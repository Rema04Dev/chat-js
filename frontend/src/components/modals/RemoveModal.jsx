import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../store/slices/modalsSlice';
import useSocket from '../../hooks/useSocket.hook';
import { showRemoveNotification, showErrorNotification } from '../../utils/notify';

const RemoveModal = () => {
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.modals.channelId);
  const { socketApi } = useSocket();
  const { t } = useTranslation();

  const handleRemove = async () => {
    try {
      await socketApi.removeChannel({ id: channelId });
      showRemoveNotification(t('removeModal.success'));
      dispatch(hideModal());
    } catch (err) {
      console.error(err);
      showErrorNotification(t('errors.unknown'));
    }
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>{t('removeModal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('removeModal.confirm')}</p>
        <div>
          <Button
            className="m-1"
            variant="secondary"
            role="button"
            onClick={() => dispatch(hideModal())}
          >
            {t('removeModal.cancel')}
          </Button>
          <Button
            className="m-1"
            variant="danger"
            role="button"
            onClick={handleRemove}
          >
            {t('removeModal.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
