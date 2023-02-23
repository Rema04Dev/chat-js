import { toast } from 'react-toastify';

const notification = {
  add: (message) => toast.success(message, { icon: '🚀' }),
  remove: (message) => toast.warning(message, { icon: '🔥' }),
  rename: (message) => toast.info(message, { icon: '✏️' }),
};

export default notification;
