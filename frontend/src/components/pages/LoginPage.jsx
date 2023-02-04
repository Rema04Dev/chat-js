import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import * as Yup from 'yup';
import axios from 'axios';
import routes from '../../utils/routes'

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
                const response = await axios.post(routes.loginPath(), { ...userData })
                if (response.statusText !== 'OK') {
                    const status = await response.data.error;
                    throw new Error(status);
                }
                const token = await response.data;
                logIn({ ...userData, token })
                navigate('/');
            } catch (e) {
                setErrorMessage(e.response.statusText)
                throw e;
            }

        },
        validationSchema: Yup.object({
            username: Yup
                .string()
                .min(3, 'Логин должен содержать минимум 3 символа')
                .required('Обязательное поле'),
            password: Yup
                .string()
                .min(4, 'Пароль должен содержать минимум 4 символа')
                .required('Обязательное поле')
        })
    })

    return (
        <>
            <Container>
                <h1 className='text-center'> Войти</h1>
                <Form
                    onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3 form-floating">
                        <Form.Control
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            type="text"
                            id="floatingLogin"
                            name="username"
                            placeholder="Введите логин" />
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
                            placeholder="Введите пароль" />
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
                <p>Нет аккаунта? <Link to="/sign-up">Регистрация</Link></p>
            </Container>

        </>
    )
};

export default LoginPage;
