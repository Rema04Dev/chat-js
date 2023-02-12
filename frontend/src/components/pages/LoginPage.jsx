import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import * as Yup from 'yup';
import axios from 'axios';
import routes from '../../utils/routes'

const INPUT_LENGTHS = {
    username: 3,
    password: 4,
}
const ERRORS_MESSAGES = {
    usernameMinLength: `Имя должно содержать минимум ${INPUT_LENGTHS.username}`,
    passwordMinLength: `Пароль должен содержать минимум ${INPUT_LENGTHS.password}`
}

const LoginPage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { logIn } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            const userData = {
                username: values.username,
                password: values.password
            }
            try {
                const response = await axios.post(routes.loginPath(), userData);
                logIn({ ...response.data })
                navigate('/');
            } catch (e) {
                const message = e.response.statusText === 'Unauthorized' ? 'Неверный логин или пароль' : 'Неизвестная ошибка'
                setErrorMessage(message)
                throw e;
            }

        },
        validationSchema: Yup.object({
            username: Yup
                .string()
                .min(INPUT_LENGTHS.username, ERRORS_MESSAGES.usernameMinLength)
                .required('Обязательное поле'),
            password: Yup
                .string()
                .min(INPUT_LENGTHS.password, ERRORS_MESSAGES.passwordMinLength)
                .required('Обязательное поле')
        })
    })

    return (
        <>
            <Container>
                <Row>
                    <Col className='col-6'>
                        <h1 className='text-center'>Войти</h1>
                        <Form
                            onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3 form-floating">
                                <Form.Control
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    type="text"
                                    id="floatingLogin"
                                    name="username"
                                    placeholder="Введите логин"
                                    className={formik.errors.username && formik.touched.username ? 'is-invalid' : ''} />
                                <Form.Label htmlFor='floatingLogin'>Ваш логин</Form.Label>
                                <Form.Text className="text-danger">
                                    {formik.errors.username && formik.touched.username ? formik.errors.username : null}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3 form-floating">
                                <Form.Control
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    type="password"
                                    id="floatingPassword"
                                    name="password"
                                    placeholder="Введите пароль"
                                    className={formik.errors.password && formik.touched.password ? 'is-invalid' : ''} />
                                <Form.Label htmlFor='floatingPassword'>Ваш пароль</Form.Label>
                                <Form.Text className="text-danger">
                                    {formik.errors.password && formik.touched.password ? formik.errors.password : null}
                                </Form.Text>
                                <Form.Text className="text-danger">
                                    {errorMessage}
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Войти
                            </Button>
                        </Form>
                        <p>Нет аккаунта? <Link to="/signup">Регистрация</Link></p>
                    </Col>
                </Row>
            </Container>

        </>
    )
};

export default LoginPage;
