import { Spinner } from 'react-bootstrap';

const CustomSpinner = ({ size }) => (
  <Spinner
    as="span"
    animation="border"
    size={size}
    role="status"
    aria-hidden="true"
  />
);

export default CustomSpinner;
