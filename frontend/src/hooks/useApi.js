import { useContext } from 'react';
import SocketContext from '../contexts/SocketContext';

const useApi = () => useContext(SocketContext);

export default useApi;
