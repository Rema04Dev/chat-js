import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import ChatHeader from './blocks/ChatHeader.jsx';
import Channels from './blocks/Channels';
import Messages from './blocks/Messages';
import fetchData from '../../store/slices/fetchData';
import useAuth from '../../hooks/useAuth.hook.js';
import getModal from '../modals/index';

const MainPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getAuthHeaders } = useAuth();
    const dispatch = useDispatch();
    const modalType = useSelector(state => state.modals.modalType)
    const renderModal = (type) => {
        if (!type) {
            return null;
        }
        const Modal = getModal(type);
        return <Modal />
    }
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const headers = getAuthHeaders()
                await dispatch(fetchData(headers))
                setLoading(false);

            } catch (e) {
                setError('server error')
                console.log(e)
            }

        }
        getData()
    }, [dispatch, getAuthHeaders]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100">
                <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem' }} className="justify-self-center lg" />
            </div>
        )
    }
    return (
        <>
            <Container className='h-100 my-4 overflow-hidden rounded shadow'>
                <Row className='h-100 bg-white flex-md-row'>
                    <Channels />
                    <Messages />
                </Row>
                {renderModal(modalType)}
            </Container>
            <ToastContainer
                position="bottom-left"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
            />
        </>
    )
}

export default MainPage;