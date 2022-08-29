import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

import PrimaryButton from '../../components/primary-button/PrimaryButton';

import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { login } from '../../store/slices/userSlice';

import styles from './Login.module.css';

export default function Login() {
  const dispach = useAppDispatch();
  const { isAuth, isLoading, error } = useAppSelector((store) => store.user);
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
    <div className={styles.container}>
      {error ? <h1>Error</h1> : ''}
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
              {isLoading ? (
                <div>Загрузка...</div>
              ) : (
                <PrimaryButton color="orange" size="m">
                  Submit
                </PrimaryButton>
              )}
            </Form>
          );
        }}
      </Formik>
      Не зарегестрированы?
      <Link to={'/registration'}>Зарегистрироваться</Link>
    </div>
  );
}
