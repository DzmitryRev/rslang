/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';

import PrimaryButton from '../../components/primary-button/PrimaryButton';
import { useGame } from '../../hooks/gamesHook';
import { randomNumber } from '../../utils/randomNumber';

import ellipse from '../../assets/img/sprimtSvg/ellipse.svg';
import mark from '../../assets/img/sprimtSvg/mark.svg';

import arrow1 from '../../assets/mainPageSvg/arrow1.svg';
import arrow2 from '../../assets/mainPageSvg/arrow2.svg';
import threelines from '../../assets/mainPageSvg/threeLines.svg';
import rhombus from '../../assets/mainPageSvg/rhombus.svg';

import styles from './Sprint.module.css';

type SprintProps = {
  isAuth: boolean;
  token: string;
  userId: string;
};

export default function Sprint({ isAuth, userId, token }: SprintProps) {
  const { fields, actions } = useGame(userId, token, isAuth);
  const [translate, setTranslate] = useState<string>('');
  const [contract, setContract] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (fields.words.length === 1) {
      actions.setPage(fields.page === 30 ? 1 : fields.page + 1);
    }
  }, [fields.words]);

  useEffect(() => {
    setTranslate(
      randomNumber(0, 1) >= 0.5
        ? fields.words[randomNumber(0, fields.words.length - 1)]
          ?.wordTranslate || ''
        : fields.word?.wordTranslate || '',
    );
  }, [fields.word]);

  useEffect(() => {
    if (seconds === 0) {
      actions.setGameEnded(true);
      actions.playComplete();
    }
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <div>
      <div className={styles.wrap}>

        <img className={`${styles.arrow1} ${styles.arrow1}`} src={arrow1} alt="arrow1" />
        <img className={`${styles.arrow2} ${styles.arrow2}`} src={arrow2} alt="arrow2" />
        <img className={`${styles.threelines} ${styles.threelines}`} src={threelines} alt="threelines" />
        <img className={`${styles.rhombus} ${styles.rhombus}`} src={rhombus} alt="rhombus" />

        {fields.gameEnded ? (
        // Появляется когда игра закончена
          <div className={styles.sprint__end}>
            <h3 className={styles.sprint__end_titel}>Игра закончена</h3>
            <h4 className={styles.sprint__end_word}>Слов: {fields.usedWords}</h4>
            <div className={styles.sprint__meaning}>
            Правильно ({fields.correct.length}):
              {fields.correct.map((item) => {
                return (
                  <h4 key={item._id} className={styles.sprint__meaning_true}>
                    {item.word} - {item.wordTranslate}
                  </h4>
                );
              })}
            </div>

            <div className={styles.sprint__meaning}>
            Неправильно ({fields.misses.length}):
              {fields.misses.map((item) => {
                return (
                  <h4 key={item._id} className={styles.sprint__meaning_false}>
                    {item.word} - {item.wordTranslate}
                  </h4>
                );
              })}
            </div>

            {isAuth && (
              <h4 className={styles.sprint__meaning}>
              Изучено слов:
                {fields.learnedWords.map((item) => {
                  return (
                    <h4 key={item._id}>
                      {item.word} === {item.wordTranslate}
                    </h4>
                  );
                })}
              </h4>
            )}
          </div>
        ) : (
        //   gameStarted ?
          <div className={styles.sprint}>
            <div className={styles.ellipse__wrapper}>
              <img className={styles.ellipse} src={ellipse} alt="ellipse" />
            </div>
            <div className={styles.sprint__wrapper}>
              <div className={styles.sprint__info}>
                <h2 className={styles.sprint__score}>{score}</h2>
                <div className={styles.sprint__markers}>
                  <p className={styles.sprint__contract}>{contract}</p>
                  <div className={styles.markers__wrapper}>
                    <div
                      className={`${styles.marker} ${
                        contract > 0 && styles.active__1
                      }`}
                    >
                      <img
                        className={`${styles.mark} ${
                          contract > 0 && styles.active__1_v
                        }`}
                        src={mark}
                        alt="mark"
                      />
                    </div>
                    <div
                      className={`${styles.marker} ${
                        contract > 1 && styles.active__2
                      }`}
                    >
                      <img
                        className={`${styles.mark} ${
                          contract > 1 && styles.active__2_v
                        }`}
                        src={mark}
                        alt="mark"
                      />
                    </div>
                    <div
                      className={`${styles.marker} ${
                        contract > 2 && styles.active__3
                      }`}
                    >
                      <img
                        className={`${styles.mark} ${
                          contract > 2 && styles.active__3_v
                        }`}
                        src={mark}
                        alt="mark"
                      />
                    </div>
                    <div
                      className={`${styles.marker} ${
                        contract > 3 && styles.active__4
                      }`}
                    >
                      <img
                        className={`${styles.mark} ${
                          contract > 3 && styles.active__4_v
                        }`}
                        src={mark}
                        alt="mark"
                      />
                    </div>
                  </div>
                  <p className={styles.sprint__multiplier}>X{multiplier}</p>
                </div>
                {/* Таймер (я не нашел в макете таймер) */}
                <h3 className={styles.sprint__time}>{seconds}</h3>
              </div>
              {/* Слово на английском (h1 нужно точно убрать и поставить нужный тег) */}
              <h1 className={styles.sprint__words}>{fields.word?.word}</h1>
              {/* Слово на русском (тег тоже нужно изменить на нужный) */}
              <h2 className={styles.sprint__translate}>{translate}</h2>

              <div className={styles.sprint__btn}>
                {/* Кнопки, нужно добавить стрелки внутрь */}
                {/* Кнопка верно */}
                <PrimaryButton
                  color="orange-gradient"
                  size="xl"
                  callback={() => {
                    if (!fields.word) {
                      return;
                    }
                    actions.setUsedWords(fields.usedWords + 1);
                    if (fields.word.wordTranslate === translate) {
                      actions.setCorrect([...fields.correct, fields.word]);
                      actions.playCorrect();
                      setScore(score + 10 * multiplier);
                      if (contract === 4) {
                        setContract(0);
                        setMultiplier(multiplier + 1);
                      } else {
                        setContract(contract + 1);
                      }
                      if (isAuth) {
                        if (fields.word.userWord) {
                          if (fields.word.userWord.difficulty === 'default') {
                            if (
                              fields.word.userWord.optional.withoutMistakes === 2
                            ) {
                              actions.addToLearnedWords();
                            } else {
                              actions.correctAnswer('default');
                            }
                          } else if (fields.word.userWord.difficulty === 'hard') {
                            if (
                              fields.word.userWord.optional.withoutMistakes === 4
                            ) {
                              actions.addToLearnedWords();
                            } else {
                              actions.correctAnswer('hard');
                            }
                          } else if (
                            fields.word.userWord.difficulty === 'learned'
                          ) {
                            actions.correctAnswer('learned');
                          }
                        } else {
                          actions.addToUserWords('correct');
                        }
                      } else {
                        actions.setLearnedWords([
                          ...fields.learnedWords,
                          fields.word,
                        ]);
                      }
                    } else {
                      actions.setMisses([...fields.misses, fields.word]);
                      actions.playMiss();
                      setContract(0);
                      setMultiplier(1);
                      if (isAuth) {
                        if (fields.word.userWord) {
                          actions.missWord();
                        } else {
                          actions.addToUserWords('miss');
                        }
                      }
                    }
                    actions.nextWord();
                  }}
                >
                Верно
                </PrimaryButton>
                {/* Кнопка неверно */}
                <PrimaryButton
                  color="blue-gradient"
                  size="xl"
                  callback={() => {
                    if (!fields.word) {
                      return;
                    }
                    actions.setUsedWords(fields.usedWords + 1);
                    if (fields.word.wordTranslate !== translate) {
                      actions.setCorrect([...fields.correct, fields.word]);
                      actions.playCorrect();
                      setScore(score + 10 * multiplier);
                      if (contract === 4) {
                        setContract(0);
                        setMultiplier(multiplier + 1);
                      } else {
                        setContract(contract + 1);
                      }
                      if (isAuth) {
                        if (fields.word.userWord) {
                          if (fields.word.userWord.difficulty === 'default') {
                            if (
                              fields.word.userWord.optional.withoutMistakes === 2
                            ) {
                              actions.addToLearnedWords();
                            } else {
                              actions.correctAnswer('default');
                            }
                          } else if (fields.word.userWord.difficulty === 'hard') {
                            if (
                              fields.word.userWord.optional.withoutMistakes === 4
                            ) {
                              actions.addToLearnedWords();
                            } else {
                              actions.correctAnswer('hard');
                            }
                          } else if (
                            fields.word.userWord.difficulty === 'learned'
                          ) {
                            actions.correctAnswer('learned');
                          }
                        } else {
                          actions.addToUserWords('correct');
                        }
                      } else {
                        actions.setLearnedWords([
                          ...fields.learnedWords,
                          fields.word,
                        ]);
                      }
                    } else {
                      actions.setMisses([...fields.misses, fields.word]);
                      actions.playMiss();
                      setContract(0);
                      setMultiplier(1);
                      if (isAuth) {
                        if (fields.word.userWord) {
                          actions.missWord();
                        } else {
                          actions.addToUserWords('miss');
                        }
                      }
                    }
                    actions.nextWord();
                  }}
                >
                Неверно
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
