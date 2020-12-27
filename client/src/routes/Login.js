import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { Formik, useField } from 'formik';

import { AuthContext } from '../contexts/AuthContext';
import Button from '../components/Button';
import InputField from '../components/InputField';

// Validation schema
const validationSchema = yup.object({
  loginMode: yup.boolean(),
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

const Login = () => {
  return (
    <section className="hero is-primary is-bold is-fullheight-with-navbar">
      <div className="hero-body">
        {/* The title */}
        <div className="container columns is-centered">
          <Formik
            initialValues={{
              loginMode: true,
              username: '',
              password: '',
              confirmPassword: '',
            }}
            validateOnChange={true}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              console.log(data);
              setSubmitting(false);
            }}
          >
            {({ values, handleSubmit, isSubmitting, setValues }) => (
              <div className="column is-half ">
                <h1 className="title is-1">
                  {values.loginMode ? 'Log in' : 'Register'}
                </h1>
                <div className="has-background-white p-4">
                  <form onSubmit={handleSubmit}>
                    <InputField
                      name="username"
                      type="text"
                      icon="fas fa-user"
                    />
                    <InputField
                      name="password"
                      type="password"
                      icon="fas fa-key"
                    />
                    {!values.loginMode && (
                      <InputField
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
                      />
                      <Button
                        title={`Switch to ${
                          !values.loginMode ? 'log in' : 'register'
                        }`}
                        type="is-light"
                        action={() =>
                          setValues({
                            ...values,
                            loginMode: !values.loginMode,
                            confirmPassword: '',
                          })
                        }
                        disabled={isSubmitting}
                      />
                    </div>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
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
