import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.hook';
import routes from '../utils/routes';

const ChatHeader = () => {
  const { logOut, user } = useAuth();
  const { t } = useTranslation();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to={routes.home} className="text-white text-decoration-none">{t('chatHeader.title')}</Link>
        </Navbar.Brand>
        {user && <Button onClick={logOut}>{t('chatHeader.logOut')}</Button>}
      </Container>
    </Navbar>
  );
};

export default ChatHeader;
