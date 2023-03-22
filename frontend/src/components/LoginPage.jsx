import { useState, useContext } from 'react';
import {
  Form, Button, Container, Row, Col, FormText,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContext';
import CustomSpinner from './skeletons/CustomSpinner';
import routes from '../utils/routes';

const LoginPage = () => {
  const [authError, setAuthError] = useState(null);
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
        password: values.password,
      };
      try {
        const response = await axios.post(routes.loginPath(), userData);
        logIn(response.data);
        navigate('/');
      } catch (e) {
        if (!e.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }
        const { statusText } = e.response;
        const message = statusText === 'Unauthorized' && 'login.validation.failed';
        setAuthError(message);
        throw e;
      }
    },
    validationSchema: Yup.object({
      username: Yup
        .string()
        .required('login.validation.required'),
      password: Yup
        .string()
        .required('login.validation.required'),
    }),
  });

  return (
    <Container>
      <Row>
        <Col className="col-9 m-auto mt-5">
          <h1 className="text-center">{t('login.title')}</h1>
          <Form
            onSubmit={formik.handleSubmit}
          >
            <Form.Group className="mb-3 form-floating">
              <Form.Control
                value={formik.values.username}
                onChange={formik.handleChange}
                type="text"
                id="floatingLogin"
                name="username"
                disabled={formik.isSubmitting}
                placeholder={t('login.username')}
                autoComplete="off"
                className={formik.errors.username && formik.touched.username ? 'is-invalid' : ''}
              />
              <Form.Label htmlFor="floatingLogin">{t('login.username')}</Form.Label>
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
                placeholder={t('login.password')}
                className={formik.errors.password && formik.touched.password ? 'is-invalid' : ''}
              />
              <Form.Label htmlFor="floatingPassword">{t('login.password')}</Form.Label>
              {
                  formik.errors.password
                  && formik.touched.password
                  && <FormText className="feedback text-danger mt-3">{t(formik.errors.password)}</FormText>
                }
              <FormText className="feedback text-danger mt-3">{t(authError)}</FormText>
            </Form.Group>
            <Button
              disabled={formik.isSubmitting}
              variant="primary"
              type="submit"
            >
              {formik.isSubmitting && <CustomSpinner size="sm" />}
              {t('login.submit')}
            </Button>
          </Form>
          <p className="mt-3">
            {t('login.hasAccount')}
            <Link style={{ marginLeft: 5 }} to={routes.signup}>{t('signup.title')}</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
