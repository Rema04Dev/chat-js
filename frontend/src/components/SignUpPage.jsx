import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form, Button, Container, Row, Col, FormText,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContext';
import CustomSpinner from './skeletons/CustomSpinner';
import routes from '../utils/routes';

const SignUpPage = () => {
  const { t } = useTranslation();
  const [signUpError, setSignUpError] = useState(null);

  const navigate = useNavigate();
  const { logIn } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup
        .string()
        .min(3, 'signup.validation.usernameLength')
        .max(20, 'signup.validation.usernameLength')
        .required('signup.validation.required'),
      password: Yup
        .string()
        .min(6, 'signup.validation.passwordLength')
        .required('signup.validation.required'),
      confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('password'), null], 'signup.validation.mustMatch')
        .required('signup.validation.required'),
    }),

    onSubmit: async (values) => {
      const userData = {
        username: values.username,
        password: values.password,
      };

      try {
        const response = await axios.post(routes.signupPath(), userData);
        logIn({ ...response.data });
        navigate(routes.home);
      } catch (e) {
        if (!e.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }
        const { status } = e.response;
        const message = status === 409 && 'signup.validation.alreadyExists';
        setSignUpError(message);
        throw e;
      }
    },
  });

  return (
    <Container>
      <Row>
        <Col className="col-9 m-auto mt-5">
          <h1 className="text-center">{t('signup.title')}</h1>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3 form-floating">
              <Form.Control
                value={formik.values.username}
                onChange={formik.handleChange}
                type="text"
                id="floatingLogin"
                name="username"
                autoComplete="off"
                disabled={formik.isSubmitting}
                placeholder={`${t('signup.username')}`}
                isInvalid={formik.errors.username && formik.touched.username}
              />
              <Form.Label htmlFor="floatingLogin">{t('signup.username')}</Form.Label>
              {
                formik.errors.username
                && formik.touched.username
                && <FormText className="feedback text-danger mt-3">{t(formik.errors.username)}</FormText>
              }
            </Form.Group>
            <Form.Group className="mb-3 form-floating">
              <Form.Control
                value={formik.values.password}
                onChange={formik.handleChange}
                type="password"
                id="floatingPassword"
                name="password"
                autoComplete="off"
                disabled={formik.isSubmitting}
                placeholder={`${t('signup.password')}`}
                isInvalid={formik.errors.password && formik.touched.password}
              />
              <Form.Label htmlFor="floatingPassword">{t('signup.password')}</Form.Label>
              <Form.Text className="text-danger">
                {
                  formik.errors.password
                  && formik.touched.password
                  && <FormText className="feedback text-danger mt-3">{t(formik.errors.password)}</FormText>
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
                autoComplete="off"
                disabled={formik.isSubmitting}
                placeholder={t('signup.confirmPassword')}
                isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}
              />
              <Form.Label htmlFor="floatingConfirmPassword">{t('signup.confirmPassword')}</Form.Label>
              {
                  (formik.errors.confirmPassword
                    && formik.touched.confirmPassword
                    && <FormText className="feedback text-danger mt-3">{t(formik.errors.confirmPassword)}</FormText>)
                    || <FormText className="feedback text-danger mt-3">{t(signUpError)}</FormText>
                }
            </Form.Group>
            <Button
              disabled={formik.isSubmitting}
              variant="primary"
              type="submit"
            >
              {formik.isSubmitting && <CustomSpinner size="sm" />}
              {t('signup.submit')}
            </Button>
          </Form>
          <p className="mt-3">
            {t('signup.hasAccount')}
            <Link style={{ marginLeft: 5 }} to="/login">{t('login.title')}</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
