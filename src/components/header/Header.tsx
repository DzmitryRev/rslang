import { Link } from 'react-router-dom';

// import logoSvg from '../../assets/img/logo.svg';

import PrimaryButton from '../primary-button/PrimaryButton';

import styles from './Header.module.css';

/**
 * TODO:
 * Выпадающее меню на ссылку игры
 * Бургер меню
 */

type HeaderProps = {
  list: 'menu__listMainPage' | 'menu__listSecondPage';
  isAuth: boolean;
};

export default function Header({ list, isAuth = false }: HeaderProps) {
  return (
    <header className={`${styles.header} ${styles.container}`}>
      <div className={styles.header__menu}>
        <div className={styles.header__logo}>
          {/* <img className={styles.header__logoImg} src={logoSvg} alt="logo"/> */}
          <h3 className={`${styles.header__logoTitle} ${styles.subtitle}`}>RSLang</h3>
        </div>
        <nav className={styles.menu}>
          <ul className={`${styles[list]}`}>
            <li className={styles.menu__item}>
              <Link className={styles.menu__link} to="/">
                Главная
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link className={styles.menu__link} to="/textbook">
                Учебник
              </Link>
            </li>
            <li className={styles.menu__item}>
              <button className={styles.menu__button}>Игры</button>
              <ul className={styles.menu__listen}>
                <li>
                  <Link className={styles.menu__link} to="/games/audiocall">
                    Аудиовызов
                  </Link>
                </li>
                <li>
                  <Link className={styles.menu__link} to="/games/sprint">
                    Спринт
                  </Link>
                </li>
              </ul>
            </li>
            <li className={styles.menu__item}>
              <Link className={styles.menu__link} to="/statistic">
                Статистика
              </Link>
            </li>
          </ul>
        </nav>

        {/* Исправить */}
        <div className={`${styles.authorized}`}>
          {isAuth ? (
            <img className={styles.header__avatar} src="" alt="avatar" />
          ) : (
            <Link to="/login">
              <PrimaryButton color="blue" size="s">
                Войти
              </PrimaryButton>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
