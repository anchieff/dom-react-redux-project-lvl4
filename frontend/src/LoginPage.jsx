import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const LoginPage = () => {
  const [loginError, setLoginErorr] = useState(false);
  const userInput = useRef(null);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => userInput.current.focus(), []);

  return (
    <Container fluid>
      <Row
        className="justify-content-md-center align-content-center"
        style={{ height: "100vh" }}
      >
        <Col xxl={6} lg={6}>
          <Card className="shadow-sm p-3">
            <Card.Body>
              <Card.Title>Войти</Card.Title>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mt-3">
                  <Form.Label htmlFor="username">Ваше имя</Form.Label>
                  <Form.Control
                    placeholder="Имя"
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
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control
                    placeholder="Пароль"
                    name="password"
                    autoComplete="current-password"
                    required
                    id="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    the username or password is incorrect
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className="w-100 mt-3" type="submit" variant="primary">
                  Войти
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
