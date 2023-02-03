import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// without validation and state
const SignUpPage = () => {
    return (
        <Container>
            <h1 className='text-center'>Регистрация</h1>
            <Form>
                <Form.Group className="mb-3 form-floating">
                    <Form.Control
                        type="text"
                        id="floatingLogin"
                        name="login"
                        placeholder="Введите логин" />
                    <Form.Label htmlFor='floatingLogin'>Ваш логин</Form.Label>
                    <Form.Text className="text-danger"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 form-floating">
                    <Form.Control
                        type="password"
                        id="floatingPassword"
                        name="password"
                        placeholder="Введите пароль" />
                    <Form.Label htmlFor='floatingPassword'>Ваш пароль</Form.Label>
                    <Form.Text className="text-danger"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 form-floating">
                    <Form.Control
                        type="password"
                        id="floatingConfirmPassword"
                        name="password"
                        placeholder="Введите пароль" />
                    <Form.Label htmlFor='floatingConfirmPassword'>Подтвердите пароль</Form.Label>
                    <Form.Text className="text-danger"></Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Регистрация
                </Button>
            </Form>
            <p>Есть аккаунт? <Link to="/login">Войти</Link></p>
        </Container>
    )
}

export default SignUpPage