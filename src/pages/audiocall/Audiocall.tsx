import { useEffect, useState } from 'react';

import { useGame } from '../../hooks/gamesHook';

import { randomNumber } from '../../utils/randomNumber';

import sound from '../../assets/img/audiocallSvg/sound.svg';

import PrimaryButton from '../../components/primary-button/PrimaryButton';
import arrow1 from '../../assets/mainPageSvg/arrow1.svg';
import arrow2 from '../../assets/mainPageSvg/arrow2.svg';
import threelines from '../../assets/mainPageSvg/threeLines.svg';
import rhombus from '../../assets/mainPageSvg/rhombus.svg';

import styles from './Audiocall.module.css';

type AudiocallProps = {
  isAuth: boolean;
  token: string;
  userId: string;
};

export default function Audiocall({ isAuth, userId, token }: AudiocallProps) {
  const { fields, actions } = useGame(userId, token, isAuth);

  const [translates, setTranslates] = useState<string[]>([]);

  const [answer, setAnswer] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    let wordsWithoutCorrect = fields.words.filter(
      (item) => item.wordTranslate !== fields.word?.wordTranslate,
    );
    const arr = [];
    for (let i = 0; i < 3; i++) {
      const currentWord =
        wordsWithoutCorrect[randomNumber(0, wordsWithoutCorrect.length - 1)];
      arr.push(currentWord?.wordTranslate || '');
      wordsWithoutCorrect = [
        ...wordsWithoutCorrect.filter(
          (item) => item.wordTranslate !== currentWord?.wordTranslate,
        ),
      ];
    }

    setTranslates(
      [...arr, fields.word?.wordTranslate || ''].sort(
        () => Math.random() - 0.5,
      ),
    );
  }, [fields.word]);

  useEffect(() => {
    if (fields.word) {
      const audio = new Audio(
        `https://react-learnwords-rsl.herokuapp.com/${fields.word.audio}`,
      );
      audio.play();
    }
  }, [fields.word]);

  return (
    <div >
      <div  className={styles.wrap}>

        <img className={`${styles.arrow1} ${styles.arrow1}`} src={arrow1} alt="arrow1" />
        <img className={`${styles.arrow2} ${styles.arrow2}`} src={arrow2} alt="arrow2" />
        <img className={`${styles.threelines} ${styles.threelines}`} src={threelines} alt="threelines" />
        <img className={`${styles.rhombus} ${styles.rhombus}`} src={rhombus} alt="rhombus" />

        {fields.gameEnded ? (
        // Появляется когда игра закончена
          <div>
            <div className={styles.wrap}></div>
            <h3>Игра закончена</h3>
            <h4>Слов: {fields.usedWords}</h4>
            <div>
            Правильно ({fields.correct.length}):
              {fields.correct.map((item) => {
                return (
                  <h4 key={item._id}>
                    {item.word} === {item.wordTranslate}
                  </h4>
                );
              })}
            </div>

            <div>
            Неправильно ({fields.misses.length}):
              {fields.misses.map((item) => {
                return (
                  <h4 key={item._id}>
                    {item.word} === {item.wordTranslate}
                  </h4>
                );
              })}
            </div>

            {isAuth && (
              <h4>
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
          <div className={styles.audiocall__wrapper}>
            <div>
              <img className={styles.sound} src={sound} alt="sound" />
            </div>
            {/* Слово на английском (h1 нужно точно убрать и поставить нужный тег) */}
            <p className={styles.audiocall__words}>{fields.word?.word}</p>
            <div>
              {answer && (
                <img
                  src={
                    'https://react-learnwords-rsl.herokuapp.com/' +
                  fields.word?.image
                  }
                  alt=""
                />
              )}
            </div>
            {/* Варианты */}<div className={styles.options}>
              {translates.map((item, index) => {
                return (
                  <div className={styles.audiocall__option}>
                    <div
                      key={index}
                      className={`${styles.field} ${
                        answer &&
                    selected === item &&
                    item !== fields.word?.wordTranslate
                          ? styles.miss
                          : ''
                      } ${
                        answer && item === fields.word?.wordTranslate
                          ? styles.correct
                          : ''
                      }`}
                      onClick={() => {
                        if (!fields.word || answer) {
                          return;
                        }
                        actions.setUsedWords(fields.usedWords + 1);
                        setSelected(item);
                        if (fields.word.wordTranslate === item) {
                          actions.playCorrect();
                          actions.setCorrect([...fields.correct, fields.word]);
                          if (isAuth) {
                            if (fields.word.userWord) {
                              if (fields.word.userWord.difficulty === 'default') {
                                if (
                                  fields.word.userWord.optional.withoutMistakes ===
                              2
                                ) {
                                  actions.addToLearnedWords();
                                } else {
                                  actions.correctAnswer('default');
                                }
                              } else if (
                                fields.word.userWord.difficulty === 'hard'
                              ) {
                                if (
                                  fields.word.userWord.optional.withoutMistakes ===
                              4
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
                          actions.playMiss();
                          actions.setMisses([...fields.misses, fields.word]);
                          if (isAuth) {
                            if (fields.word.userWord) {
                              actions.missWord();
                            } else {
                              actions.addToUserWords('miss');
                            }
                          }
                        }
                        setAnswer(true);
                      }}
                    >
                      {item}
                    </div>
                  </div>
                );
              })}
            </div>
            {answer ? (
              <PrimaryButton
                color="orange-gradient"
                size="xl"
                callback={() => {
                  if (!fields.word) {
                    return;
                  }
                  actions.nextWord();
                  setAnswer(false);
                  setSelected(null);
                  if (fields.usedWords === 10) {
                    actions.setGameEnded(true);
                    actions.playComplete();
                  }
                }}
              >
              Дальше
              </PrimaryButton>
            ) : (
              <PrimaryButton
                color="orange-gradient"
                size="xl"
                callback={() => {
                  if (!fields.word) {
                    return;
                  }
                  actions.playMiss();
                  actions.setUsedWords(fields.usedWords + 1);
                  actions.setMisses([...fields.misses, fields.word]);
                  setAnswer(true);
                  setSelected(null);
                }}
              >
              Не знаю
              </PrimaryButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
