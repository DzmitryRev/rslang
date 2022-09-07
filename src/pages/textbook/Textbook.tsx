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
      <img className={`${styles.arrow1} ${styles.arrow1}`} src={arrow1} alt="arrow1" />
      <img className={`${styles.arrow2} ${styles.arrow2}`} src={arrow2} alt="arrow2" />
      <img className={`${styles.threelines} ${styles.threelines}`} src={threelines} alt="threelines" />
      <img className={`${styles.rhombus} ${styles.rhombus}`} src={rhombus} alt="rhombus" />
      
      <img className={`${styles.beforeFooter} ${styles.beforeFooter}`} src={beforeFooter} alt="beforeFooter" />
      <img className={`${styles.star1} ${styles.star1}`} src={star1} alt="star1" />
      <img className={`${styles.ellipsePink} ${styles.ellipsePink}`} src={ellipsePink} alt="ellipsePink" />
      <img className={`${styles.ellipsePurpule} ${styles.ellipsePurpule}`} src={ellipsePurpule} alt="ellipsePurpule" />

        
      <img className={`${styles.beforeFooter1}`} src={beforeFooter} alt="beforeFooter" />
      <img className={`${styles.star11}`} src={star1} alt="star1" />
      <img className={`${styles.ellipsePink1} `} src={ellipsePink} alt="ellipsePink" />
      <img className={`${styles.ellipsePurpule1} }`} src={ellipsePurpule} alt="ellipsePurpule" />

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
      {isAuth ? (<div className={styles.difficultBtn}>
        <PrimaryButton
          color="orange-gradient"
          size="l"
          callback={() => {
            dispach(setGroup(6));
          }}
        >
          Сложные
        </PrimaryButton></div>
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
  

      <Games page={page} group={group}></Games>
  

      <Footer />
    </div>
  );
}
