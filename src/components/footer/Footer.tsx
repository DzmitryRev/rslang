import {Link} from 'react-router-dom';

// import rsLogoSvg from '../../assets/img/rs-school.svg';

// import logoSvg from '../../assets/img/logo.svg';

import styles from './Footer.module.css';

export default function Footer() {
  return (<footer className={`${styles.footer} ${styles.footerContainer}]} ${styles.container}`}>
    <div className={styles.footer__logo}>
      <div className={styles.footer__logoContainer}>
        {/* <img className={styles.footer__logoImg} src={logoSvg} alt="logo"/> */}
        <h3 className={`${styles.footer__logoTitle} ${styles.subtitle}`}>RSLang</h3>
      </div>
    </div>
    <nav className={styles.footer__menu}>
      <h4 className={styles.footer__menuTitle}>Меню</h4>
      <ul className={styles.footer__menuList}>
        <li className={styles.footer__menuItem}>
          <Link className={styles.footer__link} to="/textbook">
            Словарь
          </Link>
        </li>
        <li className={styles.footer__menuItem}>
          <Link className={styles.footer__link} to="#">
            Игры
          </Link>
        </li>
        <li className={styles.footer__menuItem}>
          <Link className={styles.footer__link} to="/statistic">
            Статистика
          </Link>
        </li>
      </ul>
    </nav>
    <nav className={styles.footer__developer}>
      <h4 className={styles.footer__menuTitle}>Разработчики</h4>
      <ul className={styles.footer__developerList}>
        <li className={styles.footer__developerItem}>
          <Link className={styles.footer__link} to="https://github.com/DzmitryRev">
            Дмитрий
          </Link>
        </li>
        <li className={styles.footer__developerItem}>
          <Link className={styles.footer__link} to="https://github.com/Plohotski">
            Артём
          </Link>
        </li>
        <li className={styles.footer__developerItem}>
          <Link className={styles.footer__link} to="https://github.com/EkaterynaSholomickaya">
            Екатерина
          </Link>
        </li>
      </ul>
    </nav>
    <div className={styles.rsSchols}>
      <Link className={styles.rsSchol} to="https://rs.school/" target="_blank" rel="noreferrer">
        {/* <img className={styles.rsSchol} src={rsLogoSvg} alt="rs-schol"/> */}
      </Link>
      <p className={`${styles.footer__link} ${styles.rsScholAge}`}>2022</p>
    </div>
  </footer>
  );
}




