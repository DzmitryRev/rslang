import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { registration } from '../../store/slices/userSlice';

export default function Registration() {
  const dispach = useAppDispatch();
  const isAuth = useAppSelector((store) => store.user.isAuth);
  const navigate = useNavigate();

  const handleSubmit = (values: { name: string; email: string; password: string }) => {
    dispach(registration(values)).then(res => {
      navigate('/login');
    });
  };

  const registrationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(25, 'To Long').required('Required'),
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
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={registrationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <label>
                Name: <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
              </label>
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
      Уже Зарегистрированы?
      <Link to={'/login'}>Войти</Link>
    </div>
  );
}
