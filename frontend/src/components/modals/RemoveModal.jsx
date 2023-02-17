import { Button, Modal } from 'react-bootstrap';
import notification from '../../utils/notify';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../store/slices/modalsSlice';
import useSocket from '../../hooks/useSocket.hook';

const RemoveModal = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { channel } = useSocket();
    const channelId = useSelector(state => state.modals.channelId);

    const handleRemove = () => {
        channel.remove({ id: channelId })
        notification.remove(t('removeModal.success'));
        dispatch(hideModal());
    };

    return (
        <>
            <Modal show>
                <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
                    <Modal.Title>{t('removeModal.removeChannel')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='lead'>{t('removeModal.confirm')}</p>
                    <div>
                        <Button
                            variant="secondary"
                            onClick={() => dispatch(hideModal())}>
                            {t('removeModal.cancel')}
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleRemove}>
                            {t('removeModal.remove')}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RemoveModal;