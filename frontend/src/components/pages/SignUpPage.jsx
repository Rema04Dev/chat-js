import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import routes from '../../utils/routes';
import axios from 'axios';
import { useState, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';

const SignUpPage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { logIn } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            username: Yup
                .string()
                .min(3, 'От 3 до 20 символов')
                .max(20, 'От 3 до 20 символов')
                .required('Обязательное поле'),
            password: Yup
                .string()
                .min(6, 'Не менее 6 символов')
                .required('Обязательное поле'),
            confirmPassword: Yup
                .string()
                .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        }),

        onSubmit: async (values) => {
            const userData = {
                username: values.username,
                password: values.password
            }

            try {
                const response = await axios.post(routes.signupPath(), userData)
                console.log(response.data);
                logIn({ ...response.data })
                navigate('/')
                if (response.response.status === 409) {
                    throw new Error('already exists')
                }
            } catch (e) {
                const status = e.response.status
                const message = status === 409 ? 'Такой пользователь уже существует' : 'Неизвестная ошибка'
                setErrorMessage(message);
                throw e;
            }
        }
    })
    return (
        <Container>
            <h1 className='text-center'>Регистрация</h1>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3 form-floating">
                    <Form.Control
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        type="text"
                        id="floatingLogin"
                        name="username"
                        placeholder="Введите логин"
                        className={`${formik.errors.username && formik.touched.username ? 'is-invalid' : ''}`} />
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
                        className={`${formik.errors.password && formik.touched.password ? 'is-invalid' : ''}`} />
                    <Form.Label htmlFor='floatingPassword'>Ваш пароль</Form.Label>
                    <Form.Text className="text-danger">
                        {formik.errors.password && formik.touched.password ? formik.errors.password : null}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 form-floating">
                    <Form.Control
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        type="password"
                        id="floatingConfirmPassword"
                        name="confirmPassword"
                        placeholder="Подтвердите пароль"
                        className={`${formik.errors.confirmPassword && formik.touched.confirmPassword ? 'is-invalid' : ''}`} />
                    <Form.Label htmlFor='floatingConfirmPassword'>Подтвердите пароль</Form.Label>
                    <Form.Text className="text-danger">
                        {formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : null}
                    </Form.Text>
                    <Form.Text className="text-danger">
                        {errorMessage}
                    </Form.Text>
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