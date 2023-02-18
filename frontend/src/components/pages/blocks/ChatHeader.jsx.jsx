import { Navbar, Container, Button } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth.hook';
import { useTranslation } from 'react-i18next';
const ChatHeader = () => {
    const { logOut, user } = useAuth();
    const { t } = useTranslation();
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        {t('chatHeader.title')}
                    </Navbar.Brand>
                    {user &&
                        <Button onClick={logOut}>{t('chatHeader.logOut')}</Button>}
                </Container>
            </Navbar>
        </>
    )
}

export default ChatHeader;