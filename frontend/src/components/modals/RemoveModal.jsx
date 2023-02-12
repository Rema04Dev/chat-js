import { Button, Modal } from 'react-bootstrap';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:3000');
const RemoveModal = ({ show, handleClose, channelId }) => {
    const handleRemove = () => {
        socket.emit('removeChannel', ({ id: channelId }))
        handleClose();
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить канал</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='lead'>Уверены?</p>
                    <div>
                        <Button variant="secondary" onClick={handleClose}>
                            Отменить
                        </Button>
                        <Button variant="danger" onClick={handleRemove}>
                            Удалить
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RemoveModal;