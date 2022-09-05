import PrimaryButton from '../primary-button/PrimaryButton';

import { IWord } from '../../api/api.types';

import audioSvg from '../../assets/img/audio.svg';

import styles from './WordCard.module.css';

type WordCardProps = {
  word: IWord;
  isAuth: boolean;
  isDifficultPage?: boolean;
  setAudioPlaying: (condition: boolean) => void;
  difficultCallback?: () => void;
  learnedCallBack?: () => void;
  removeFromDifficult?: () => void;
  audioPlaying: boolean;
};

export default function WordCard({
  word,
  isAuth,
  isDifficultPage,
  audioPlaying,
  setAudioPlaying,
  difficultCallback = () => {},
  learnedCallBack = () => {},
  removeFromDifficult = () => {},
}: WordCardProps) {
  const cN = isAuth
    ? `${styles.container} ${word.userWord?.difficulty === 'hard' ? styles.difficult : ''} ${
      word.userWord?.difficulty === 'learned' ? styles.learned : ''
    }`
    : `${styles.container}
  }`;
  const playAudio = () => {
    const audio = new Audio(`https://react-learnwords-rsl.herokuapp.com/${word.audio}`);
    const audioExample = new Audio(
      `https://react-learnwords-rsl.herokuapp.com/${word.audioExample}`,
    );
    const audioMeaning = new Audio(
      `https://react-learnwords-rsl.herokuapp.com/${word.audioMeaning}`,
    );
    setAudioPlaying(true);
    audio.play();
    audio.onended = () => {
      audioMeaning.play();
    };
    audioMeaning.onended = () => {
      audioExample.play();
    };
    audioExample.onended = () => {
      setAudioPlaying(false);
    };
  };
  return (
    <div className={cN}>
      <img
        src={audioSvg}
        className={styles.audio}
        alt="play-word"
        onClick={audioPlaying ? () => {} : playAudio}
      />
      <div className={styles.imgContainer}>
        <img src={`https://react-learnwords-rsl.herokuapp.com/${word.image}`} alt="" />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.headingContainer}>
          <h2 className={styles.word}>{word.word}</h2>
        </div>
        <span className={styles.transcription}>{word.transcription}</span>
        <p className={styles.translate}>{word.wordTranslate}</p>
        <p className={styles.textMeaning} dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
        <p className={styles.textExample} dangerouslySetInnerHTML={{ __html: word.textExample }} />
        <p className={styles.textMeaningTranslate}>{word.textMeaningTranslate}</p>
        <p className={styles.textExampleTranslate}>{word.textExampleTranslate}</p>
        {isAuth ? (
          <div className={styles.controller}>
            <div className={styles.statistic}>
              {word.userWord?.optional.misses === 0 && word.userWord?.optional.correct === 0 ? (
                <></>
              ) : (
                <>
                  <span className={styles.misses}>
                    Ошибок: <span>{word.userWord?.optional.misses}</span>
                  </span>
                  <span className={styles.hits}>
                    Попаданий: <span>{word.userWord?.optional.correct}</span>
                  </span>
                </>
              )}
            </div>

            <div className={styles.buttonsContainer}>
              {isDifficultPage ? (
                <PrimaryButton
                  color="orange-gradient"
                  size="l"
                  disabled={word.userWord?.difficulty === 'learned' ? true : false}
                  callback={removeFromDifficult}
                >
                  Удалить
                </PrimaryButton>
              ) : (
                <>
                  <PrimaryButton
                    color="orange-gradient"
                    size="l"
                    disabled={word.userWord?.difficulty === 'learned' ? true : false}
                    callback={difficultCallback}
                  >
                    Сложное
                  </PrimaryButton>
                  <PrimaryButton
                    color="blue-gradient"
                    size="l"
                    disabled={word.userWord?.difficulty === 'hard' ? true : false}
                    callback={learnedCallBack}
                  >
                    Изученное
                  </PrimaryButton>
                </>
              )}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
