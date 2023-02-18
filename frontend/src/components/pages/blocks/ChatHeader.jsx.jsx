import { Navbar, Container, Button } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth.hook';
const ChatHeader = () => {
    const { logOut, user } = useAuth();
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        Chat JS
                    </Navbar.Brand>
                    {user && <Button onClick={logOut}>Выйти</Button>}
                </Container>
            </Navbar>
        </>
    )
}

export default ChatHeader;