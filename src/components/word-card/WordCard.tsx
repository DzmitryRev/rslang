import PrimaryButton from '../primary-button/PrimaryButton';

import { IWord } from '../../api/api.types';

import styles from './WordCard.module.css';

import audioSvg from './audio.svg';

// import sss from './sss.mp3';

type WordCardProps = {
  word: IWord;
  isAuth: boolean;
  isDifficult: boolean;
  isLearned: boolean;
  difficultCallback: () => void;
  learnedCallBack: () => void;
};

export default function WordCard({
  word,
  isAuth,
  isDifficult,
  isLearned,
  difficultCallback,
  learnedCallBack,
}: WordCardProps) {
  const audio = new Audio(`https://react-learnwords-rsl.herokuapp.com/${word.audio}`);
  const audioExample = new Audio(`https://react-learnwords-rsl.herokuapp.com/${word.audioExample}`);
  return (
    <div
      className={`${styles.container} ${isDifficult ? styles.difficult : ''} ${
        isLearned ? styles.learned : ''
      }`}
    >
      <img
        src={audioSvg}
        className={styles.audio}
        alt="play-word"
        onClick={() => {
          audio
            .play()
            .then((res) => console.log(res))
            .finally(() => {
              audioExample.play();
            });
        }}
      />
      <div className={styles.imgContainer}>
        <img src={`https://react-learnwords-rsl.herokuapp.com/${word.image}`} alt="" />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.headingContainer}>
          <h2 className={styles.word}>{word.word}</h2>
          <span className={styles.transcription}>{word.transcription}</span>
        </div>
        <p className={styles.translate}>{word.wordTranslate}</p>
        <p className={styles.textMeaning}>{word.textMeaning}</p>
        <p className={styles.textExample}>{word.textExample}</p>
        <p className={styles.textMeaningTranslate}>{word.textMeaningTranslate}</p>
        <p className={styles.textExampleTranslate}>{word.textExampleTranslate}</p>
        {isAuth ? (
          <div className={styles.controller}>
            <div className={styles.statistic}>
              <span className={styles.misses}>
                Ошибок: <span>5</span>
              </span>
              <span className={styles.hits}>
                Попаданий: <span>1</span>
              </span>
            </div>
            <div className={styles.buttonsContainer}>
              <PrimaryButton
                color="orange-gradient"
                size="l"
                disabled={isLearned ? true : false}
                callback={() => {
                  difficultCallback();
                }}
              >
                Сложное
              </PrimaryButton>
              <PrimaryButton
                color="blue-gradient"
                size="l"
                disabled={isDifficult ? true : false}
                callback={() => {
                  learnedCallBack();
                }}
              >
                Изученное
              </PrimaryButton>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
