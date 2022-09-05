import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

import keys from '../../assets/img/keys.svg';
import gearMax from '../../assets/img/gear-max.svg';
import mechanismMin from '../../assets/img/mechanism-min.svg';

import PrimaryButton from '../../components/primary-button/PrimaryButton';

import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { login } from '../../store/slices/userSlice';

import styles from './Login.module.css';

export default function Login() {
  const dispach = useAppDispatch();
  const { isAuth, isLoading } = useAppSelector((store) => store.user);
  const navigate = useNavigate();

  const handleSubmit = (
    values: { email: string; password: string },
    actions: FormikHelpers<{ email: string; password: string }>,
  ) => {
    dispach(login(values))
      .unwrap()
      .catch((e) => {
        actions.setFieldError('email', 'Неверное имя пользователя или пароль');
        actions.setFieldError(
          'password',
          'Неверное имя пользователя или пароль',
        );
      });
  };

  const loginSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, '*Слишком короткий')
      .max(50, '*Слишком длиный')
      .required('*Обязательное поле'),
    email: Yup.string()
      .email('*Неверный e-mail')
      .required('*Обязательное поле'),
  });

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <div className={`${styles.container__login} ${styles.center}`}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <div>
              <Form>
                <label>
                  <p className={styles.title__input}>Адрес</p>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Введите email..."
                    className={styles.type__input}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.error__input}
                  />
                </label>
                <label>
                  <p className={styles.title__input}>Пароль</p>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Введите пароль..."
                    className={styles.type__input}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.error__input}
                  />
                </label>
                {isLoading ? (
                  <div>Загрузка...</div>
                ) : (
                  <div className={styles.registration__btn}>
                    <PrimaryButton color="orange" size="m">
                      войти
                    </PrimaryButton>
                    <div className={styles.registration__links}>
                      <Link
                        to={'/registration'}
                        className={styles.registration__link}
                      >
                        Регистрация
                      </Link>
                    </div>
                  </div>
                )}
              </Form>
            </div>
          );
        }}
      </Formik>
      <div className={styles.user__imgs}>
        <img className={styles.user__img} src={keys} alt="keys" />
        <div className={styles.mechanismSvg}>
          <img
            className={`${styles.mechanism__max} ${styles.mechanism}`}
            src={gearMax}
            alt=""
          />
          <img
            className={`${styles.mechanism__min} ${styles.mechanism}`}
            src={mechanismMin}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
