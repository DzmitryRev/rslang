import { useEffect, useState } from 'react';

import PrimaryButton from '../../components/primary-button/PrimaryButton';
import { useGame } from '../../hooks/gamesHook';
import { randomNumber } from '../../utils/randomNumber';

import styles from './Sprint.module.css';

type SprintProps = {
  isAuth: boolean;
  token: string;
  userId: string;
};

export default function Sprint({ isAuth, userId, token }: SprintProps) {
  const { fields, actions } = useGame(userId, token, isAuth);
  const [translate, setTranslate] = useState<string>('');
  const [gameEnded, setGameEnded] = useState<boolean>(false);
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
        ? fields.words[randomNumber(0, fields.words.length - 1)]?.wordTranslate || ''
        : fields.word?.wordTranslate || '',
    );
  }, [fields.word]);

  useEffect(() => {
    if (seconds === 0) {
      setGameEnded(true);
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
      {gameEnded ? (
        // Появляется когда игра закончена
        <div>
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
        //   gameStarted ?
        <div>
          {/* Таймер (я не нашел в макете таймер) */}
          <h3>{seconds}</h3>
          {/* Слово на английском (h1 нужно точно убрать и поставить нужный тег) */}
          <h1>{fields.word?.word}</h1>
          {/* Слово на русском (тег тоже нужно изменить на нужный) */}
          <h2>{translate}</h2>
          <h2>{score}</h2>
          <h2>{contract}</h2>
          <div>
            <div className={`${styles.marker} ${contract > 0 && styles.active}`}></div>
            <div className={`${styles.marker} ${contract > 1 && styles.active}`}></div>
            <div className={`${styles.marker} ${contract > 2 && styles.active}`}></div>
            <div className={`${styles.marker} ${contract > 3 && styles.active}`}></div>
          </div>
          <h2>X{multiplier}</h2>
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
                      if (fields.word.userWord.optional.withoutMistakes === 2) {
                        actions.addToLearnedWords();
                      } else {
                        actions.correctAnswer('default');
                      }
                    } else if (fields.word.userWord.difficulty === 'hard') {
                      if (fields.word.userWord.optional.withoutMistakes === 4) {
                        actions.addToLearnedWords();
                      } else {
                        actions.correctAnswer('hard');
                      }
                    } else if (fields.word.userWord.difficulty === 'learned') {
                      actions.correctAnswer('learned');
                    }
                  } else {
                    actions.addToUserWords('correct');
                  }
                } else {
                  actions.setLearnedWords([...fields.learnedWords, fields.word]);
                }
              } else {
                actions.setMisses([...fields.misses, fields.word]);
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
                      if (fields.word.userWord.optional.withoutMistakes === 2) {
                        actions.addToLearnedWords();
                      } else {
                        actions.correctAnswer('default');
                      }
                    } else if (fields.word.userWord.difficulty === 'hard') {
                      if (fields.word.userWord.optional.withoutMistakes === 4) {
                        actions.addToLearnedWords();
                      } else {
                        actions.correctAnswer('hard');
                      }
                    } else if (fields.word.userWord.difficulty === 'learned') {
                      actions.correctAnswer('learned');
                    }
                  } else {
                    actions.addToUserWords('correct');
                  }
                } else {
                  actions.setLearnedWords([...fields.learnedWords, fields.word]);
                }
              } else {
                actions.setMisses([...fields.misses, fields.word]);
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
      )}
    </div>
  );
}
