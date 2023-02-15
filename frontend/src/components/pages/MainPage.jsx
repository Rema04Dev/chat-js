import { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import Header from '../Header';
import Channels from '../Channels';
import Messages from '../Messages';
import AuthContext from '../../contexts/AuthContext';
import fetchData from '../../store/slices/fetchData';

const MainPage = () => {
    const { getAuthHeaders } = useContext(AuthContext);
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            const headers = getAuthHeaders()
            await dispatch(fetchData(headers))
        }
        getData()
    }, [dispatch]);

    return (
        <>
            <Header />
            <Container className='h-100 my-4 overflow-hidden rounded shadow'>
                <Row className='h-100 bg-white flex-md-row'>
                    <Channels />
                    <Messages />
                </Row>
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