import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button, Form, Card, Row, Col, FloatingLabel,
} from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import routes from './routes';
import useAuth from './hooks';

function SigninPage() {
  const [signinError, setSigninError] = useState(false);
  const userInput = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const SigninSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('signin.required_error'))
      .min(3, t('signin.min_3_max_20'))
      .max(20, t('signin.min_3_max_20')),
    password: Yup.string()
      .required(t('signin.required_error'))
      .min(6, t('signin.min_6')),
    confirm_password: Yup.string()
      .required(t('signin.required_error'))
      .oneOf([Yup.ref('password'), null], t('signin.not_matches')),
  });

  const redirect = () => {
    const { state } = location;
    if (state) {
      const { pathname } = state.from;
      navigate(pathname, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  const sendSigninData = async (data) => {
    try {
      const result = await axios.post(routes.signupPath(), data);
      const { token, username } = result.data;
      localStorage.setItem(
        'user',
        JSON.stringify({ username, token, id: _.uniqueId() }),
      );
      auth.logIn();
      redirect();
    } catch (err) {
      if (err.isAxiosError && err.response.status === 409) {
        setSigninError(true);
        userInput.current.select();
        return;
      }
      throw err;
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: SigninSchema,
    onSubmit: (values) => {
      const { username, password } = values;
      sendSigninData({ username, password });
    },
  });

  useEffect(() => userInput.current.focus(), []);

  return (
    <Row
      className="justify-content-md-center align-content-center"
      style={{ height: '100vh' }}
    >
      <Col xxl={6} lg={6}>
        <Card className="shadow-sm p-3">
          <Card.Body>
            <h1 className="card-title">{t('signin.header')}</h1>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mt-3">
                <FloatingLabel
                  label={t('signin.username')}
                  controlId="username"
                >
                  <Form.Control
                    placeholder={t('signin.username')}
                    name="username"
                    autoComplete="username"
                    required
                    ref={userInput}
                    isInvalid={
                      (formik.touched.username && formik.errors.username)
                      || signinError
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                  {signinError && (
                    <Form.Control.Feedback type="invalid">
                      {t('signin.user_exist')}
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mt-3">
                <FloatingLabel
                  label={t('signin.password')}
                  controlId="password"
                >
                  <Form.Control
                    placeholder={t('signin.password')}
                    name="password"
                    required
                    type="password"
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mt-3">
                <FloatingLabel
                  label={t('signin.confirm_password')}
                  controlId="confirm_password"
                >
                  <Form.Control
                    placeholder={t('signin.confirm_password')}
                    name="confirm_password"
                    required
                    type="password"
                    isInvalid={
                      formik.touched.confirm_password
                      && formik.errors.confirm_password
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.confirm_password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirm_password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Button className="w-100 mt-3" type="submit" variant="primary">
                {t('signin.submit')}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default SigninPage;
