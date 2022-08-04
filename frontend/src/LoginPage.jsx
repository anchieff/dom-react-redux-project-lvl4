import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button, Form, Card, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import routes from './routes';
import useAuth from './hooks';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

function LoginPage() {
  const [loginError, setLoginErorr] = useState(false);
  const userInput = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const redirect = () => {
    const { state } = location;
    if (state) {
      const { pathname } = state.from;
      navigate(pathname, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  const sendLoginData = async (data) => {
    try {
      const { username } = data;
      const result = await axios.post(routes.loginPath(), data);
      const { token } = result.data;
      localStorage.setItem(
        'user',
        JSON.stringify({ username, token, id: _.uniqueId() }),
      );
      auth.logIn();
      redirect();
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        setLoginErorr(true);
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
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      sendLoginData(values);
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
            <Card.Title>{t('login.header')}</Card.Title>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mt-3">
                <Form.Label htmlFor="username">
                  {t('login.username')}
                </Form.Label>
                <Form.Control
                  placeholder={t('login.username')}
                  name="username"
                  autoComplete="username"
                  required
                  id="username"
                  ref={userInput}
                  isInvalid={loginError}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label htmlFor="password">
                  {t('login.password')}
                </Form.Label>
                <Form.Control
                  placeholder={t('login.password')}
                  name="password"
                  autoComplete="current-password"
                  required
                  id="password"
                  type="password"
                  isInvalid={loginError}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <Form.Control.Feedback type="invalid">
                  {t('login.error')}
                </Form.Control.Feedback>
              </Form.Group>
              <Button className="w-100 mt-3" type="submit" variant="primary">
                {t('login.submit')}
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            {t('signin.signin_text')}
            <Link to="/signup">{t('signin.signin_link')}</Link>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}

export default LoginPage;
