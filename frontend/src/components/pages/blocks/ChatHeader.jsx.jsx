import { Navbar, Container, Button } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth.hook';
const ChatHeader = () => {
    const { logOut } = useAuth();
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        Chat JS
                    </Navbar.Brand>
                    <Button onClick={logOut}>Выйти</Button>
                </Container>
            </Navbar>
        </>
    )
}

export default ChatHeader;