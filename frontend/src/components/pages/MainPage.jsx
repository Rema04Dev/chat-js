import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import ChatHeader from './blocks/ChatHeader.jsx';
import Channels from './blocks/Channels';
import Messages from './blocks/Messages';
import fetchData from '../../store/slices/fetchData';
import useAuth from '../../hooks/useAuth.hook.js';
import getModal from '../modals/index';

const MainPage = () => {
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
            const headers = getAuthHeaders()
            await dispatch(fetchData(headers))
        }
        getData()
    }, [dispatch, getAuthHeaders]);

    return (
        <>
            <ChatHeader />
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