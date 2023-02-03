import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
        },
        validationSchema: Yup.object({
            login: Yup.string().min(3, 'Логин должен содержать минимум 3 символа').required('Обязательное поле'),
            password: Yup.string().min(4, 'Пароль должен содержать минимум 4 символа').required('Обязательное поле')
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
                            value={formik.values.login}
                            onChange={formik.handleChange}
                            type="text"
                            id="floatingLogin"
                            name="login"
                            placeholder="Введите логин" />
                        <Form.Label htmlFor='floatingLogin'>Ваш логин</Form.Label>
                        <Form.Text className="text-danger">
                            {formik.errors.login && formik.touched.login ? formik.errors.login : null}
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
