import { Navbar, Container, Button } from 'react-bootstrap';
const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        Chat JS
                    </Navbar.Brand>
                    <Button>Выйти</Button>
                </Container>
            </Navbar>
        </>
    )
}

export default Header