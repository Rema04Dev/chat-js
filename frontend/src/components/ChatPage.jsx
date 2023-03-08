import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import fetchData from '../store/slices/fetchData';
import Channels from './Channels/Channels';
import Messages from './Messages/Messages';
import useAuth from '../hooks/useAuth.hook.js';
import getModal from './modals/index';

const MainPage = () => {
  const loading = useSelector((state) => state.channels.loading);
  const { getAuthHeaders, logOut } = useAuth();
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modals.modalType);
  const renderModal = (type) => {
    if (!type) {
      return null;
    }
    const Modal = getModal(type);
    return <Modal />;
  };
  useEffect(() => {
    const getData = async () => {
      const headers = getAuthHeaders();
      dispatch(fetchData(headers))
        .unwrap()
        .catch(({ status }) => {
          if (status === 401) {
            logOut();
          }
        });
    };
    getData();
  }, [dispatch, getAuthHeaders, logOut]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem' }} className="justify-self-center lg" />
      </div>
    );
  }
  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
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
  );
};

export default MainPage;
