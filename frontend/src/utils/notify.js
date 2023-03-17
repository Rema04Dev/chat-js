import { toast } from 'react-toastify';

export const showAddNotification = (message) => toast.success(message, { icon: '🚀' });
export const showRemoveNotification = (message) => toast.warning(message, { icon: '🔥' });
export const showRenameNotification = (message) => toast.info(message, { icon: '✏️' });
export const showErrorNotification = (message) => toast.error(message);
