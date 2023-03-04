import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const app = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await init(socket));
};

app();
