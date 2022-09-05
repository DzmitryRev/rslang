import { Link, NavLink } from 'react-router-dom';

import playHed from '../../assets/img/play-hed.svg';
import rotate from '../../assets/img/rotate.svg';
import group from '../../assets/img/group.svg';
import arrow from '../../assets/img/arrow.svg';
import illustration1 from '../../assets/img/illustration1.svg';
import keys from '../../assets/img/keys.svg';
import gearMax from '../../assets/img/gear-max.svg';
import mechanismMin from '../../assets/img/mechanism-min.svg';
import lines from '../../assets/mainPageSvg/lines.svg';
import threeArcs from '../../assets/mainPageSvg/threeArcs.svg';
import arrow1 from '../../assets/mainPageSvg/arrow1.svg';
import arrow2 from '../../assets/mainPageSvg/arrow2.svg';
import threelines from '../../assets/mainPageSvg/threeLines.svg';
import rhombus from '../../assets/mainPageSvg/rhombus.svg';
import beforeFooter from '../../assets/mainPageSvg/beforeFooter.svg';

import star1 from '../../assets/mainPageSvg/star1.svg';
import ellipsePink from '../../assets/mainPageSvg/ellipsePink.svg';
import ellipsePurpule from '../../assets/mainPageSvg/ellipsePurpule.svg';

import rombPurple from '../../assets/mainPageSvg/rombPurple.svg';
import star2 from '../../assets/mainPageSvg/star2.svg';
import star4 from '../../assets/mainPageSvg/star4.svg';

import threeLinesPurple from '../../assets/mainPageSvg/threeLinesPurple.svg';

import arrow4 from '../../assets/mainPageSvg/arrow4.svg';

import longArrow from '../../assets/mainPageSvg/longArrow.svg';
import elipseDotted from '../../assets/mainPageSvg/elipseDotted.svg';

import moonWithoutShadow from '../../assets/mainPageSvg/moonWithoutShadow.svg';
import moonWithShadow from '../../assets/mainPageSvg/moonWithShadow.svg';

import ekateryna from '../../assets/team/ekateryna.png';
import artsem from '../../assets/team/artsem.png';
import dima from '../../assets/team/dima.png';

import Footer from '../footer/Footer';

import PrimaryButton from '../primary-button/PrimaryButton';
import Title from '../title/Title';

import styles from './MainPage.module.css';

const MainPage = () => {
  return (
    <>
      <main className={`${styles.main} ${styles.container}`}>
        <div className={styles.main__titels}>
          <div className={styles.titelsWrapper}>
            <h1 className={styles.titels__header}>Выучить английский с RSLang - легко</h1>
            <img className={styles.lines} src={lines} alt="lines" />
            <img className={styles.threelines} src={threelines} alt="threelines" />
            <img className={styles.arrow1} src={arrow1} alt="arrow1" />
            <p className={styles.titels__description}>
              Эффективный подход к изучению слов, с RsLang вы легко пополните свой словарный запас
            </p>
            <div className={styles.btn__description}>
              <PrimaryButton color="orange" size="m">
                Начать
              </PrimaryButton>
              <div className={styles.btn__play}>
                <img className={styles.btn__playImg} src={playHed} alt="video" />
                <p className={styles.btn__playTitle}>видео</p>
              </div>
            </div>
          </div>
          <div className={styles.animations}>
            <img className={styles.animation} src={group} alt="group" />
            <div className={styles.animation__vector}>
              <img src={rotate} alt="rotate" className={styles.rotate} />
            </div>
            <img className={styles.threeArcs} src={threeArcs} alt="threeArcs" />
          </div>
        </div>
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
              to={'/game'}
              state={{ game: 'audiocall' }}
              className={`${styles.info__boxAudio} ${styles.box}`}
            >
              <h2 className={styles.box__titel}>Аудиовызов</h2>
              <p className={styles.box__text}>
                - игра на тренировку навыков аудирования. В процессе игры десять попыток угадать
                слово, произнесенное на английском языке
              </p>
              <img className={styles.info__boxsArrow} src={arrow} alt="" />
            </NavLink>
            <NavLink
              to={'/game'}
              state={{ game: 'sprint' }}
              className={`${styles.info__boxSprint} ${styles.box}`}
            >
              <h2 className={styles.box__titel}>Спринт</h2>
              <p className={styles.box__text}>
                - проверьте насколько хорошо вы знаете значения английских слов. За ограниченный
                период времени укажите верен ли предложенный перевод заданным словам
              </p>
              <img className={`${styles.info__boxsArrow} ${styles.arrowLeft}`} src={arrow} alt="" />
            </NavLink>
          </div>
        </div>
        <div className={`${styles.dictionary} ${styles.container}`}>
          <div className={styles.dictionary__info}>
            <Title align="start" width="dictionary">
              <img className={styles.rombPurple} src={rombPurple} alt="rombPurple" />
              Найдите новые слова в словаре
            </Title>
            <p className={`${styles.dictionary__text} ${styles.texts}`}>
              <img className={styles.star2} src={star2} alt="star2" />
              Увеличивайте ваш словарный запас, запоминая новые английские слова. Тренируйте лексику
              из подготовленных тематических наборов или создайте ваш персональный словарь.
            </p>
            <PrimaryButton color="orange" size="m">
              Учить
            </PrimaryButton>
          </div>
          <img className={styles.dictionary__img} src={illustration1} alt="" />
        </div>
        <div className={styles.video__wrapper}>
          <div className={styles.video}>
            <Title align="center" width="video">
              Посмотрев видео, вы можете ознакомиться с возможностями приложения
            </Title>
          </div>
          <div className={styles.video__player}>
            <img
              className={styles.threeLinesPurple}
              src={threeLinesPurple}
              alt="threeLinesPurple"
            />
            <img className={styles.arrow2Video} src={arrow2} alt="arrow2" />
            <img className={styles.ellipsePink} src={ellipsePink} alt="ellipsePink" />
            <img className={styles.ellipsePurpuleVideo} src={ellipsePurpule} alt="ellipsePurpule" />
            <video controls className={styles.video__play} src="#"></video>
          </div>
        </div>

        <div className={styles.team}>
          <div className={styles.student}>
            <div className={styles.student__container}>
              <div className={styles.student__containerKatiaDima}>
                <div className={styles.student__containerKatia}>
                  <img className={styles.ekateryna} src={ekateryna} alt="" />
                </div>
                <div className={styles.student__containerDima}>
                  <img
                    className={styles.moonWithoutShadow}
                    src={moonWithoutShadow}
                    alt="moonWithoutShadow"
                  />
                  <img className={styles.dima} src={dima} alt="dima" />
                  <img
                    className={styles.moonWithShadow}
                    src={moonWithShadow}
                    alt="moonWithShadow"
                  />
                </div>
              </div>
              <div className={styles.student__containerArtsem}>
                <img className={styles.artsem} src={artsem} alt="artsem" />
              </div>
            </div>

            <div className={styles.team__infoWrap}>
              <div className={styles.team__info}>
                <Title align="start" width="dictionary">
                  <img className={styles.arrow4} src={arrow4} alt="arrow4" />
                  Наша команда
                </Title>
                <p className={`${styles.dictionary__text} ${styles.texts}`}>
                  Над приложением работала команда молодых талантливых разработчиков
                </p>
              </div>
              <div className={styles.team__descriptionWrap}>
                <div className={`${styles.student__name} ${styles.katiaWrap}`}>
                  <h3 className={styles.student__nameTitle}>Екатерина</h3>
                  <p className={`${styles.student__nameTexts} ${styles.texts}`}>
                    Екатерина уже была знакома с программированием, после чего их дороги разошлись,
                    но, благодаря RSSchool, они встретились вновь и не намерены больше расставаться.
                    Екатренира - разработала дизайн сайта, верстка и дизайн главной страницы,
                    верстка и дизайн учебника, помогала писать Api
                  </p>
                </div>
                <div className={`${styles.student__name} ${styles.artsemWrap}`}>
                  <h3 className={styles.student__nameTitle}>Артем</h3>
                  <p className={`${styles.student__nameTexts} ${styles.texts} `}>
                    Знакомство с JS началась с того, что Артем решил самостоятельно создать
                    интернет-магазин для своей компании. Процесс этот оказался настолько
                    увлекательным, что Артем решил продолжить свое обучение на курсах RSSchool.
                    Артем стилизовал игры Аудиовызов и Сафари, занимался версткой главной страницы,
                    настраивал работу приложения.
                  </p>
                </div>
                <div className={`${styles.student__name} ${styles.dimamWrap}`}>
                  <h3 className={styles.student__nameTitle}>Дмитрий</h3>
                  <p className={`${styles.student__nameTexts} ${styles.texts}`}>
                    Человек, который "от скуки" решил попробовать покодить. И нашел себя! За время
                    обучения на курсах умудрился не только прекрасно выполнять основные задания, но
                    еще и самостоятельно изучить React! Дмитрий - тим лид нашей команды. Разработал
                    весь функционал приложения, настроил работу с базой данных, координировал работу
                    членов команды.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.user}>
          <Title align="center" width="user">
            <img className={styles.longArrow} src={longArrow} alt="longArrow" />
            Не забудьте пройти авторизацию, чтобы воспользоваться всеми возможностями приложения
          </Title>
          <div className={styles.user__container}>
            <img className={styles.star4} src={star4} alt="star4" />
            <div className={styles.user__dataWrap}>
              <div className={styles.user__data}>
                <div className={styles.logo}>
                  <h3 className={styles.subtitle}>Логин</h3>
                  <input
                    className={`${styles.creationName} ${styles.input}`}
                    type="text"
                    placeholder="Введите логин..."
                  />
                </div>
                <div className={styles.password}>
                  <h3 className={styles.subtitle}>Пароль</h3>
                  <input
                    className={`${styles.creationName} ${styles.input}`}
                    type="text"
                    placeholder="Введите пароль..."
                  />
                </div>
              </div>
              <div className={styles.user__btn}>
                <PrimaryButton color="blue" size="s">
                  Войти
                </PrimaryButton>
                <Link to={'/registration'}>
                  <button className={`${styles.user__btnRegistration} ${styles.btn - 2}`}>
                    Регистрация
                  </button>
                </Link>
              </div>
            </div>
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
            <img className={styles.elipseDotted} src={elipseDotted} alt="elipseDotted" />
            <img className={styles.beforeFooter} src={beforeFooter} alt="beforeFooter" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
