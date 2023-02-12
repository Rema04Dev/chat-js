import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import * as Yup from 'yup';
import axios from 'axios';
import routes from '../../utils/routes'
import ErrorMessage from '../ErrorMessage';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { logIn } = useContext(AuthContext);
    const { t } = useTranslation();

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
                const message = e.response.statusText === 'Unauthorized' ? t('login.validation.failed') : 'Неизвестная ошибка'
                setErrorMessage(message)
                throw e;
            }

        },
        validationSchema: Yup.object({
            username: Yup
                .string()
                .required(t('login.validation.required')),
            password: Yup
                .string()
                .required(t('login.validation.required')),
        })
    })

    return (
        <>
            <Container>
                <Row>
                    <Col className='col-9 m-auto mt-5'>
                        <h1 className='text-center'>{t('login.title')}</h1>
                        <Form
                            onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3 form-floating">
                                <Form.Control
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    type="text"
                                    id="floatingLogin"
                                    name="username"
                                    placeholder={t('login.username')}
                                    autoComplete='off'
                                    className={formik.errors.username && formik.touched.username ? 'is-invalid' : ''} />
                                <Form.Label htmlFor='floatingLogin'>{t('login.username')}</Form.Label>
                                {
                                    formik.errors.username
                                    && formik.touched.username
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
                                    placeholder={t('login.password')}
                                    className={formik.errors.password && formik.touched.password ? 'is-invalid' : ''} />
                                <Form.Label htmlFor='floatingPassword'>{t('login.password')}</Form.Label>
                                <Form.Text className="text-danger">
                                    {
                                        formik.errors.password
                                        && formik.touched.password
                                        && <ErrorMessage message={formik.errors.password} />
                                    }
                                </Form.Text>
                                <ErrorMessage message={errorMessage} />
                            </Form.Group>
                            <Button variant="primary" type="submit">{t('login.submit')}</Button>
                        </Form>
                        <p className='mt-3'>{t('login.hasAccount')} <Link to="/signup">{t('signup.title')}</Link></p>
                    </Col>
                </Row>
            </Container>

        </>
    )
};

export default LoginPage;
