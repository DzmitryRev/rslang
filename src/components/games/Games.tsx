import { Link, NavLink } from 'react-router-dom';

import arrow from '../../assets/img/arrow.svg';
import arrow2 from '../../assets/mainPageSvg/arrow2.svg';
import star1 from '../../assets/mainPageSvg/star1.svg';
import rhombus from '../../assets/mainPageSvg/rhombus.svg';
import ellipsePink from '../../assets/mainPageSvg/ellipsePink.svg';
import ellipsePurpule from '../../assets/mainPageSvg/ellipsePurpule.svg';
import Title from '../title/Title';

import styles from './Games.module.css';

type GamesProps = {
  page:number;
  group:number;
 
}


const Games = ({page, group} :GamesProps) => { 
  return (
    <div className={styles.info}>
      <div className={styles.infoWrapper}>
        <img className={styles.rhombus} src={rhombus} alt="rhombus" />
        <img className={styles.arrow2} src={arrow2} alt="arrow2" />
        <Title align="center" width="info">
     Пройдите игру, чтобы улучшить свой словарный запас
        </Title>
        <p className={`${styles.info__text} ${styles.texts}`}>
     Настало время отложить в сторону работу и немного развлечься. В этом разделе вы
     найдете бесплатные онлайн игры, связанные с английским языком, которые помогут не
     только интересно провести вермя, но и освежат твой словарный запас.
        </p>
      </div>
      <div className={styles.info__boxs}>
        <img className={styles.star1} src={star1} alt="star1" />
        <img className={styles.ellipsePink} src={ellipsePink} alt="ellipsePink" />
        <img className={styles.ellipsePurpule} src={ellipsePurpule} alt="ellipsePurpule" />
        <NavLink
          to={'/audiocall'}
          state={{ page, group }} 
          className={`${styles.info__boxAudio} ${styles.box}`}
        >
          <h2 className={styles.box__titel}>Аудиовызов</h2>
          <p className={styles.box__text}>
       - игра на тренировку навыков аудирования. В процессе игры десять попыток угадать
       слово, произнесенное на английском языке
          </p>
          <img className={styles.info__boxsArrow} src={arrow} alt="" />
        </NavLink>
        <Link
          to={'/sprint'}
          state={{ page, group }}
          className={`${styles.info__boxSprint} ${styles.box}`}
        >
    
          <h2 className={styles.box__titel}>Спринт</h2>
          <p className={styles.box__text}>
       - проверьте насколько хорошо вы знаете значения английских слов. За ограниченный
       период времени укажите верен ли предложенный перевод заданным словам
          </p>
          <img className={`${styles.info__boxsArrow} ${styles.arrowLeft}`} src={arrow} alt="" />
        </Link>
      </div>
    </div>);
};

export default Games;