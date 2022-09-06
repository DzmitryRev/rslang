import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';


import { API } from '../../api/api';
import { IUserWordBody } from '../../api/api.types';
import Footer from '../../components/footer/Footer';
import { Pagination } from '../../components/pagination/Pagination';
import PetalButton from '../../components/petal-button/PetalButton';
import PrimaryButton from '../../components/primary-button/PrimaryButton';
import WordList from '../../components/word-list/WordList';
import arrow from '../../assets/img/arrow.svg';

import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import {
  getAuthWords,
  getUnauthWords,
  Groups,
  setAudioPlaying,
  setGroup,
  setLoading,
  setPage,
} from '../../store/slices/textbookSlice';
import { availableGroups } from '../../utils/availableGroups';

import styles from './Textbook.module.css';

/**
 * TODO:
 * Верстка, то что тут имеется можно перемещать внутри тегов как угодно.
 * главное не изменять их самих. В общем  *оробачивать можно во что угодно и стилизовать таким образом.
 * Если надо зайти глубже то WordList компонент - компонент, содержащий карточки,
 * а WordCard - сама карточка. Файлы * стилей находятся в соответсвующих папках
 * Стили для этой страницы пишем в Textbook.module.css
 * По пагинации все просто: в компонент Pagination можно не заходить,
 * я выписал нужные стили с пометками что для чего в файл Pagination.module.css
 * Так же нужно добавить иконки для футера и хеадера. Катя походу забыла их закинуть.
 * Я теги имг с этими картинками закоментил, когда имги появятся - можно раскоментить
 *
 * Короче цель довести до ума страницу и доделать хеадер футер и т.д. и т.п. !!!!!!!!!!
 * Ну и заодно тестировать, если что-то не так с функционалом - сообщайте
 */

export default function Textbook() {
  const dispach = useAppDispatch();
  const { token, userId, isAuth, userWords } = useAppSelector((store) => store.user);
  const { words, group, page, audioPlaying, totalPages, loading } = useAppSelector(
    (store) => store.textbook,
  );

  useEffect(() => {
    if (isAuth) {
      dispach(setLoading(true));
      dispach(getAuthWords({ userId, token, page, group }));
    } else {
      dispach(setLoading(true));
      dispach(getUnauthWords({ page, group }));
    }
  }, [page, group, userId, isAuth, token, dispach]);

  const addToUserWords = (wordId: string, body: IUserWordBody) => {
    API.addToUserWord(userId, wordId, body, token).then(() => {
      dispach(getAuthWords({ userId, token, page, group }));
    });
  };
  const updateUserWord = (wordId: string, body: IUserWordBody) => {
    API.updateUserWord(userId, wordId, body, token).then(() => {
      dispach(getAuthWords({ userId, token, page, group }));
    });
  };

  const allWordsLearned = words.filter((word) => !word.userWord);

  return (
    <div>
      {/* Навигация! */}
      {availableGroups.map((item) => {
        return (
          <Link to={'/textbook'} key={item}>
            <PetalButton
              shadowColor="blue"
              size="s"
              active={Groups[group] === Groups[item] ? true : false}
              callback={() => {
                dispach(setGroup(item));
              }}
            >
              {Groups[item]}
            </PetalButton>
          </Link>
        );
      })}
      {/* Кнопка со сложными словами (активна только если пользователь авторизован) */}
      {isAuth ? (
        <PrimaryButton
          color="orange-gradient"
          size="l"
          callback={() => {
            dispach(setGroup(6));
          }}
        >
          Сложные
        </PrimaryButton>
      ) : (
        ''
      )}
      {/* ============ */}
      {/* Маркер который активен если все слова на странице изучены! Стилизовать по усмотрению*/}
      {allWordsLearned.length === 0 && group !== 6 ? (
        <div>Все слова на этой странице изучены!</div>
      ) : (
        ''
      )}
      {/* Блок со словами */}
      {loading ? (
        <div>
          <h1>ЗАГРУЗКА...</h1>
        </div>
      ) : (
        <WordList
          words={words}
          userWords={userWords}
          addToUserWords={addToUserWords}
          updateUserWord={updateUserWord}
          isAuth={isAuth}
          isDifficultPage={group === 6 ? true : false}
          audioPlaying={audioPlaying}
          setAudioPlaying={(condition) => {
            dispach(setAudioPlaying(condition));
          }}
        />
      )}
      {/* pagination */}
      {group === 6 || loading ? (
        ''
      ) : (
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePagination={(page) => {
            dispach(setPage(page));
            window.scrollTo(0, 0);
          }}
        />
      )}
      <div className={styles.info__boxs}>
        <NavLink
          to={'/audiocall'}
          state={{ page, group}}
          className={`${styles.info__boxAudio} ${styles.box}`}
        >
          <h2 className={styles.box__titel}>Аудиовызов</h2>
          <p className={styles.box__text}>
            - игра на тренировку навыков аудирования. В процессе игры десять попыток угадать слово,
            произнесенное на английском языке
          </p>
          <img className={styles.info__boxsArrow} src={arrow} alt="" />
        </NavLink>
        <NavLink
          to={'/sprint'}
          state={{ page, group}}
          className={`${styles.info__boxSprint} ${styles.box}`}
        >
          <h2 className={styles.box__titel}>Спринт</h2>
          <p className={styles.box__text}>
            - проверьте насколько хорошо вы знаете значения английских слов. За ограниченный период
            времени укажите верен ли предложенный перевод заданным словам
          </p>
          <img className={`${styles.info__boxsArrow} ${styles.arrowLeft}`} src={arrow} alt="" />
        </NavLink>
      </div>
      <Footer />
    </div>
  );
}
