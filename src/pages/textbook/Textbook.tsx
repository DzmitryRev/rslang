import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import useSound from 'use-sound';

import load from '../../assets/img/load.gif';
import arrow1 from '../../assets/mainPageSvg/arrow1.svg';
import arrow2 from '../../assets/mainPageSvg/arrow2.svg';
import threelines from '../../assets/mainPageSvg/threeLines.svg';
import rhombus from '../../assets/mainPageSvg/rhombus.svg';
import beforeFooter from '../../assets/mainPageSvg/beforeFooter.svg';

import star1 from '../../assets/mainPageSvg/star1.svg';
import ellipsePink from '../../assets/mainPageSvg/ellipsePink.svg';
import ellipsePurpule from '../../assets/mainPageSvg/ellipsePurpule.svg';


import { API } from '../../api/api';
import { IUserWordBody } from '../../api/api.types';
import Footer from '../../components/footer/Footer';
import { Pagination } from '../../components/pagination/Pagination';
import PetalButton from '../../components/petal-button/PetalButton';

import PrimaryButton from '../../components/primary-button/PrimaryButton';
import Games from '../../components/games/Games';
import WordList from '../../components/word-list/WordList';

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
    <div className="styles.petalButton__wrap">
      {/* Навигация! */}
      <div className={styles.petalButton__wrap}>
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
      </div>
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
        <div className="styles.loadWrap">
          <img className="styles.load" src={load} alt="load" />
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
  

      <Games></Games>
  

      <Footer />
    </div>
  );
}
