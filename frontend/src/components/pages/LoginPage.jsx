import { Form, Button, Container } from 'react-bootstrap';
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
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Ваш логин</Form.Label>
                        <Form.Control
                            value={formik.values.login}
                            onChange={formik.handleChange}
                            type="text"
                            name="login"
                            placeholder="Введите логин" />
                        <Form.Text className="text-danger">
                            {formik.errors.login && formik.touched.login ? formik.errors.login : null}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ваш пароль</Form.Label>
                        <Form.Control
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            type="password"
                            name="password"
                            placeholder="Введите пароль" />
                        <Form.Text className="text-danger">
                            {formik.errors.password && formik.touched.password ? formik.errors.password : null}
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Войти
                    </Button>
                </Form>
            </Container>

        </>
    )
};

export default LoginPage;
