import { Navbar, Container, Button } from 'react-bootstrap';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
const Header = () => {
    const { logOut } = useContext(AuthContext);
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

export default Header