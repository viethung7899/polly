import React, { useState, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { Formik } from 'formik';

import { AuthContext } from '../contexts/AuthContext';
import Button from '../components/Button';
import InputFieldWithLabel from '../components/InputFieldWithLabel';
import { ErrorNotification } from '../components/Notification';

// Validation schema
const validationSchema = yup.object({
  loginMode: yup.boolean(),
  name: yup.string().when('loginMode', {
    is: false,
    then: yup.string().required('Name is required'),
  }),
  username: yup.string().required('User is required').min(6, 'Too short'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Too short')
    .max(20, 'Too long'),
  confirmPassword: yup.string().when('loginMode', {
    is: false,
    then: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Password does not matched'),
  }),
});

const Login = ({ location }) => {
  const { token, login, register } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState(
    location.state ? location.state.errorMessage : null
  );

  // Redirect to main page if logged in
  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <section className="hero is-primary is-bold is-fullheight-with-navbar">
      <div className="hero-body">
        {/* The title */}
        <div className="container columns is-centered">
          <Formik
            initialValues={{
              loginMode: true,
              name: '',
              username: '',
              password: '',
              confirmPassword: '',
            }}
            validateOnChange={true}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              const { name, username, password } = values;
              console.log(values);
              let action;
              if (values.loginMode) action = login(username, password);
              else action = register(name, username, password);
              action
                .then(() => {
                  setError(null);
                  if (location.state && location.state.from) {
                    history.push(location.state.from.pathname);
                  } else history.push('/');
                })
                .catch((err) => {
                  let message = 'Oops... Cannot reach to the server';
                  if (err.response)
                    message = 'Oops... ' + err.response.data.message;
                  setError(message);
                })
                .finally(() => setSubmitting(false));
            }}
          >
            {({ values, handleSubmit, isSubmitting, setValues }) => (
              <div className="column is-half ">
                <h1 className="title is-1">
                  {values.loginMode ? 'Log in' : 'Register'}
                </h1>
                <div className="has-background-white p-4">
                  {error && <ErrorNotification title={error} />}
                  <form onSubmit={handleSubmit}>
                    {!values.loginMode && <InputFieldWithLabel
                      name="name"
                      type="text"
                      icon="fas fa-user"
                    />}
                    <InputFieldWithLabel
                      name="username"
                      type="text"
                      icon="fas fa-user"
                    />
                    <InputFieldWithLabel
                      name="password"
                      type="password"
                      icon="fas fa-key"
                    />
                    {!values.loginMode && (
                      <InputFieldWithLabel
                        name="confirmPassword"
                        type="password"
                        icon="fas fa-key"
                      />
                    )}
                    <div className="buttons is-centered">
                      <Button
                        title={values.loginMode ? 'Log in' : 'Register'}
                        type="is-primary"
                        action={handleSubmit}
                        disabled={isSubmitting}
                        loading={isSubmitting}
                      />
                      <Button
                        title={`Switch to ${
                          !values.loginMode ? 'log in' : 'register'
                        }`}
                        type="is-light"
                        action={() => {
                          setValues({
                            name: '',
                            username: '',
                            password: '',
                            confirmPassword: '',
                            loginMode: !values.loginMode,
                          });
                          setError(null);
                        }}
                        disabled={isSubmitting}
                      />
                    </div>
                  </form>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Login;
