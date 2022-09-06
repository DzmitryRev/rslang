import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

import logoSvg from '../../assets/img/logo.svg';
import logout from '../../assets/img/logout.svg';

import { useAppDispatch } from '../../hooks/storeHooks';

import { setLogout } from '../../store/slices/userSlice';

import styles from './Header.module.css';

type HeaderProps = {
  isAuth: boolean;
};

export default function Header({ isAuth = false }: HeaderProps) {
  const dispach = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={`${styles.header} ${styles.container}`}>
      <div className={styles.header__menu}>
        <div
          className={styles.burger}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span></span>
        </div>
        <div className={styles.header__logo}>
          <img className={styles.header__logoImg} src={logoSvg} alt="logo" />
          <h3 className={`${styles.header__logoTitle} ${styles.subtitle}`}>RSLang</h3>
        </div>

        <ul
          className={
            !isOpen ? `${styles.close} ${styles.menu__listMainPage} ` : styles.menu__listMainPage
          }
        >
          <li className={`${styles.menu__item}`}>
            <NavLink
              className={({ isActive }) =>
                styles.menu__link + ((isActive && ` ${styles.active}`) || '')
              }
              onClick={() => {
                setIsOpen(false);
              }}
              to="/"
            >
              Главная
            </NavLink>
          </li>
          <li className={styles.menu__item}>
            <NavLink
              className={({ isActive }) =>
                styles.menu__link + ((isActive && ` ${styles.active}`) || '')
              }
              onClick={() => {
                setIsOpen(false);
              }}
              to="/textbook"
            >
              Учебник
            </NavLink>
          </li>
          <li className={styles.menu__item}>
            <NavLink
              className={({ isActive }) =>
                styles.menu__link + ((isActive && ` ${styles.active}`) || '')
              }
              onClick={() => {
                setIsOpen(false);
              }}
              to={'/game/audiocall'}
            >
              Аудиовызов
            </NavLink>
          </li>
          <li className={styles.menu__item}>
            <NavLink
              className={({ isActive }) =>
                styles.menu__link + ((isActive && ` ${styles.active}`) || '')
              }
              onClick={() => {
                setIsOpen(false);
              }}
              to={'/game/sprint'}
            >
              Спринт
            </NavLink>
          </li>
        </ul>

        <div className={`${styles.authorized}`}>
          {isAuth ? (
            <img
              className={styles.logout}
              src={logout}
              alt="logout"
              onClick={() => {
                dispach(setLogout());
              }}
            />
          ) : (
            <Link to="/login" className={styles.header__loginBtn}>
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
