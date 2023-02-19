import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import routes from '../../utils/routes';
import AuthContext from '../../contexts/AuthContext';
import ErrorMessage from '../ErrorMessage';
import CustomSpinner from '../skeletons/CustomSpinner';

const SignUpPage = () => {
    const { t } = useTranslation();

    const [signUpError, setSignUpError] = useState(null);
    const [isSubmitting, SetisSubmitting] = useState(false);

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
                SetisSubmitting(true)
                const response = await axios.post(routes.signupPath(), userData)
                logIn({ ...response.data })
                navigate('/')
            } catch (e) {
                const status = e.response.status
                const message = status === 409 ? t('signup.validation.alreadyExists') : t('errors.network')
                setSignUpError(message);
                SetisSubmitting(false)
                throw e;
            }
        },
    });

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
                                disabled={formik.isSubmitting}
                                placeholder={`${t('signup.username')}`}
                                isInvalid={formik.errors.username && formik.touched.username} />
                            <Form.Label htmlFor='floatingLogin'>{t('signup.username')}</Form.Label>
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
                                disabled={formik.isSubmitting}
                                placeholder={`${t('signup.password')}`}
                                isInvalid={formik.errors.password && formik.touched.password} />
                            <Form.Label htmlFor='floatingPassword'>{t('signup.password')}</Form.Label>
                            <Form.Text className="text-danger">
                                {
                                    formik.errors.password
                                    && formik.touched.password
                                    && <ErrorMessage message={formik.errors.password} />
                                }
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
                                disabled={isSubmitting}
                                placeholder={t('signup.confirmPassword')}
                                isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword} />
                            <Form.Label htmlFor='floatingConfirmPassword'>{t('signup.confirmPassword')}</Form.Label>
                            <Form.Text className="text-danger">
                                {
                                    (formik.errors.confirmPassword
                                        && formik.touched.confirmPassword
                                        && <ErrorMessage message={formik.errors.confirmPassword} />)
                                    || <ErrorMessage message={signUpError} />
                                }
                            </Form.Text>
                        </Form.Group>
                        <Button
                            disabled={formik.isSubmitting}
                            variant="primary"
                            type="submit">
                            {formik.isSubmitting && <CustomSpinner size="sm" />}
                            {t('signup.submit')}
                        </Button>
                    </Form>
                    <p className='mt-3'>{t('signup.hasAccount')} <Link to="/login">{t('login.title')}</Link></p>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUpPage;