import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { login } from '../../store/slices/userSlice';

export default function Login() {
  const dispach = useAppDispatch();
  const isAuth = useAppSelector((store) => store.user.isAuth);
  const navigate = useNavigate();

  const handleSubmit = (values: { email: string; password: string }) => {
    dispach(login(values));
  };

  const loginSchema = Yup.object().shape({
    password: Yup.string().min(8, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <label>
                Email: <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </label>
              <label>
                Password:
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </label>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
      Не зарегестрированы?
      <Link to={'/registration'}>Зарегистрироваться</Link>
    </div>
  );
}
