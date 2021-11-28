// see SignupForm.js for comments
import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../store';
import useParamsQuery from '../../utils/hooks/use-query';

function LoginForm() {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  const query = useParamsQuery();

  const [showAlert, setShowAlert] = useState(false);

  // Authentication required error
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const fallback = query.get('fallback');

  useEffect(() => {
    if (fallback) {
      setShowAuthAlert(true);
    }
  }, [fallback]);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: {
          email: userFormData.email,
          password: userFormData.password,
        },
      });
      const token = mutationResponse.data.login.token;
      authCtx.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  if (authCtx.isAuthenticated) {
    const redirectPage = query.get('fallback') ? query.get('fallback') : '';
    return <Redirect to={`/${redirectPage}`} />;
  }

  return (
    <>
      <Form noValidate onSubmit={handleFormSubmit} className="form">
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Alert
          variant="danger"
          show={showAuthAlert}
          onClose={() => setShowAuthAlert(false)}
          dismissible
        >
          Login in to access {query.get('pageName')} page
        </Alert>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

export default LoginForm;
