import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../store/slices/modalsSlice';
import { setCurrentChannelId } from '../../store/slices/channelsSlice'
import useSocket from '../../hooks/useSocket.hook';
import notification from '../../utils/notify';

const RemoveModal = () => {
    const dispatch = useDispatch();
    const channelId = useSelector(state => state.modals.channelId);
    const { currentChannelId } = useSelector(state => state.channels);
    const { removeChannel } = useSocket();
    const { t } = useTranslation();

    const handleRemove = () => {
        console.log(`current: ${currentChannelId}\ndeleted: ${channelId}`)
        removeChannel({ channelId });
        if (currentChannelId === channelId) {
            dispatch(setCurrentChannelId(1));
        }
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
                            className='m-1'
                            variant="secondary"
                            role="cancel"
                            onClick={() => dispatch(hideModal())}>
                            {t('removeModal.cancel')}
                        </Button>
                        <Button
                            className='m-1'
                            variant="danger"
                            role="confirm"
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