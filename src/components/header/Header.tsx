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
  const [openGame, setOpenGame] = useState(true);

  return (
    <header className={`${styles.header} ${styles.container}`}>
      <div className={styles.header__menu}>
        <div className={styles.header__logo}>
          <img className={styles.header__logoImg} src={logoSvg} alt="logo" />
          <h3 className={`${styles.header__logoTitle} ${styles.subtitle}`}>RSLang</h3>
        </div>
        <nav className={styles.menu}>
          <ul
            className={
              isOpen ? `${styles.close} ${styles.menu__listMainPage} ` : styles.menu__listMainPage
            }
          >
            <li className={`${styles.menu__item}`}>
              <NavLink
                className={({ isActive }) =>
                  styles.menu__link + ((isActive && ` ${styles.active}`) || '')
                }
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
                to="/textbook"
              >
                Учебник
              </NavLink>
            </li>
            <li className={`${styles.menu__item} ${styles.menu__lastItem}`}>
              <button
                className={styles.menu__button}
                onClick={() => {
                  setOpenGame(!openGame);
                }}
              >
                Игры
              </button>

              <ul
                className={
                  openGame ? `${styles.menu__listen} ${styles.close}` : styles.menu__listen
                }
              >
                <li>
                  <NavLink className={styles.menu__link} to={'/game'} state={{ game: 'audiocall' }}>
                  Аудиовызов
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.menu__link} to={'/game'} state={{ game: 'sprint' }}>
                  Спринт
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className={styles.menu__item}>
              <NavLink
                className={({ isActive }) =>
                  styles.menu__link + ((isActive && ` ${styles.active}`) || '')
                }
                to="/statistic"
              >
                Статистика
              </NavLink>
            </li>
          </ul>
        </nav>

        <div
          className={styles.burger}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        ></div>
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

// onClick={() => {
//   setIsOpen(!isOpen)
//   }}
//   className = {isOpen? стиль для открытого меню : стиль для закрытого}
