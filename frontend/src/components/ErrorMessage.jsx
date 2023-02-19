import { FormText } from 'react-bootstrap';

const ErrorMessage = ({ message }) => {
    return message &&
        <FormText className='feedback text-danger mt-3'>{message}</FormText>;
}

export default ErrorMessage;