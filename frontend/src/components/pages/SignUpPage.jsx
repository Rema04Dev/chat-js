import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignUpPage = () => {
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

        onSubmit: (values) => {
            console.log(values)
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