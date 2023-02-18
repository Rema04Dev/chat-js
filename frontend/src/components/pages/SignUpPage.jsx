import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import routes from '../../utils/routes';
import axios from 'axios';
import { useState, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../ErrorMessage';
const SignUpPage = () => {
    const { t } = useTranslation();

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
                .min(3, t('signup.validation.usernameLength'))
                .max(20, t('signup.validation.usernameLength'))
                .required(t('signup.validation.required')),
            password: Yup
                .string()
                .min(6, t('signup.validation.passwordLength'))
                .required(t('signup.validation.required')),
            confirmPassword: Yup
                .string()
                .oneOf([Yup.ref('password'), null], t('signup.validation.mustMatch'))
                .required(t('signup.validation.required'))
        }),

        onSubmit: async (values) => {
            const userData = {
                username: values.username,
                password: values.password
            }

            try {
                const response = await axios.post(routes.signupPath(), userData)
                logIn({ ...response.data })
                navigate('/')
            } catch (e) {
                const status = e.response.status
                const message = status === 409 ? t('signup.validation.alreadyExists') : 'Неизвестная ошибка'
                setErrorMessage(message);
                throw e;
            }
        }
    })
    return (
        <Container>
            <Row>
                <Col className='col-9 m-auto mt-5'>
                    <h1 className='text-center'>{t('signup.title')}</h1>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3 form-floating">
                            <Form.Control
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                type="text"
                                id="floatingLogin"
                                name="username"
                                autoComplete='off'
                                placeholder={`${t('signup.username')}`}
                                className={`${formik.errors.username && formik.touched.username ? 'is-invalid' : ''}`} />
                            <Form.Label htmlFor='floatingLogin'>{t('signup.username')}</Form.Label>
                            {
                                formik.errors.username && formik.touched.username
                                && <ErrorMessage message={formik.errors.username} />
                            }
                        </Form.Group>
                        <Form.Group className="mb-3 form-floating">
                            <Form.Control
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                type="password"
                                id="floatingPassword"
                                name="password"
                                autoComplete='off'
                                placeholder={`${t('signup.password')}`}
                                className={`${formik.errors.password && formik.touched.password ? 'is-invalid' : ''}`} />
                            <Form.Label htmlFor='floatingPassword'>{t('signup.password')}</Form.Label>
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
                                autoComplete='off'
                                placeholder={t('signup.confirmPassword')}
                                className={`${formik.errors.confirmPassword && formik.touched.confirmPassword ? 'is-invalid' : ''}`} />
                            <Form.Label htmlFor='floatingConfirmPassword'>{t('signup.confirmPassword')}</Form.Label>
                            <Form.Text className="text-danger">
                                {formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : null}
                            </Form.Text>
                            <Form.Text className="text-danger">
                                {errorMessage}
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {t('signup.submit')}
                        </Button>
                    </Form>
                    <p className='mt-3'>{t('signup.hasAccount')} <Link to="/login">{t('login.title')}</Link></p>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUpPage