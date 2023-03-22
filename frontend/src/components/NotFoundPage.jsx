import { Link } from 'react-router-dom';
import routes from '../utils/routes';

const NotFoundPage = () => (
  <>
    <h1>NotFoundPage</h1>
    <Link to={routes.home}>Back to home</Link>
  </>

);

export default NotFoundPage;
