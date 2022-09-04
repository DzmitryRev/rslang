import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { API } from '../../api/api';

import { IWord } from '../../api/api.types';
import PrimaryButton from '../../components/primary-button/PrimaryButton';
import { randomNumber } from '../../utils/randomNumber';

import styles from './Sprint.module.css';

type SprintLocationState = {
  group: number;
  page: number;
};

type SprintProps = {
  isAuth: boolean;
  token: string;
  userId: string;
};

export default function Sprint({ isAuth, userId, token }: SprintProps) {
  const location = useLocation();
  const state = location.state as SprintLocationState;
  const navigate = useNavigate();
  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [navigate, state]);
  const [words, setWords] = useState<IWord[]>([]);
  const [page, setPage] = useState<number>(state?.page);
  const [word, setWord] = useState<IWord | null>(null);
  const [translate, setTranslate] = useState<string>('');
  //   const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [usedWords, setUsedWords] = useState<number>(0);
  const [learnedWords, setLearnedWords] = useState<IWord[]>([]);
  const [misses, setMisses] = useState<IWord[]>([]);
  const [correct, setCorrect] = useState<IWord[]>([]);
  const [contract, setContract] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (isAuth) {
      API.getAggregatedWords(userId, token, `{"page": ${page - 1}, "group": ${state?.group}}`).then(
        (res) => {
          setWords([...words, ...res.data[0].paginatedResults]);
        },
      );
    } else {
      API.getWords(page - 1, state?.group).then((res) => {
        setWords([...words, ...res.data]);
      });
    }
  }, [page]);

  useEffect(() => {
    setWord(words[0]);
  }, [words]);

  useEffect(() => {
    if (words.length === 1) {
      setPage(page === 30 ? 1 : page + 1);
    }
  }, [words]);

  useEffect(() => {
    setTranslate(
      randomNumber(0, 1) >= 0.5
        ? words[randomNumber(0, words.length - 1)]?.wordTranslate || ''
        : word?.wordTranslate || '',
    );
  }, [word]);

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

  function updateWord(
    id: string,
    difficulty: 'default' | 'hard' | 'learned',
    correct: number,
    misses: number,
    withoutMistakes: number,
  ) {
    API.updateUserWord(
      userId,
      id,
      {
        difficulty: difficulty,
        optional: {
          correct,
          misses,
          withoutMistakes,
        },
      },
      token,
    );
  }

  return (
    <div>
      {gameEnded ? (
        // Появляется когда игра закончена
        <div>
          <h3>Игра закончена</h3>
          <h4>Слов: {usedWords}</h4>
          <div>
            Правильно ({correct.length}):
            {correct.map((item) => {
              return (
                <h4 key={item._id}>
                  {item.word} === {item.wordTranslate}
                </h4>
              );
            })}
          </div>

          <div>
            Неправильно ({misses.length}):
            {misses.map((item) => {
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
              {learnedWords.map((item) => {
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
          <h1>{word?.word}</h1>
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
              if (!word) {
                return;
              }
              setWords(words.slice(1));
              setWord(words[0]);
              setUsedWords(usedWords + 1);
              if (word.wordTranslate === translate) {
                setCorrect([...learnedWords, word]);
                setScore(score + 10 * multiplier);
                if (contract === 4) {
                  setContract(0);
                  setMultiplier(multiplier + 1);
                } else {
                  setContract(contract + 1);
                }
                if (isAuth) {
                  if (word.userWord) {
                    if (word.userWord.difficulty === 'default') {
                      if (word.userWord.optional.withoutMistakes === 2) {
                        setLearnedWords([...learnedWords, word]);
                        updateWord(
                          word._id,
                          'learned',
                          word.userWord.optional.correct + 1,
                          word.userWord.optional.misses,
                          word.userWord.optional.withoutMistakes + 1,
                        );
                      } else {
                        updateWord(
                          word._id,
                          'default',
                          word.userWord.optional.correct + 1,
                          word.userWord.optional.misses,
                          word.userWord.optional.withoutMistakes + 1,
                        );
                      }
                    } else if (word.userWord.difficulty === 'hard') {
                      if (word.userWord.optional.withoutMistakes === 4) {
                        setLearnedWords([...learnedWords, word]);
                        updateWord(
                          word._id,
                          'learned',
                          word.userWord.optional.correct + 1,
                          word.userWord.optional.misses,
                          word.userWord.optional.withoutMistakes + 1,
                        );
                      } else {
                        updateWord(
                          word._id,
                          'hard',
                          word.userWord.optional.correct + 1,
                          word.userWord.optional.misses,
                          word.userWord.optional.withoutMistakes + 1,
                        );
                      }
                    } else if (word.userWord.difficulty === 'learned') {
                      updateWord(
                        word._id,
                        'learned',
                        word.userWord.optional.correct + 1,
                        word.userWord.optional.misses,
                        word.userWord.optional.withoutMistakes + 1,
                      );
                    }
                  } else {
                    API.addToUserWord(
                      userId,
                      word._id,
                      {
                        difficulty: 'default',
                        optional: {
                          correct: 1,
                          misses: 0,
                          withoutMisses: 1,
                        },
                      },
                      token,
                    );
                  }
                } else {
                  setLearnedWords([...learnedWords, word]);
                }
              } else {
                setMisses([...learnedWords, word]);
                setContract(0);
                setMultiplier(1);
                if (isAuth) {
                  if (word.userWord) {
                    if (word.userWord.difficulty === 'learned') {
                      updateWord(
                        word._id,
                        'default',
                        word.userWord.optional.correct,
                        word.userWord.optional.misses + 1,
                        0,
                      );
                    } else {
                      updateWord(
                        word._id,
                        word.userWord.difficulty,
                        word.userWord.optional.correct,
                        word.userWord.optional.misses + 1,
                        0,
                      );
                    }
                  } else {
                    API.addToUserWord(
                      userId,
                      word._id,
                      {
                        difficulty: 'default',
                        optional: {
                          correct: 0,
                          misses: 1,
                          withoutMistakes: 0,
                        },
                      },
                      token,
                    );
                  }
                }
              }
            }}
          >
            Верно
          </PrimaryButton>
          {/* Кнопка неверно */}
          <PrimaryButton
            color="blue-gradient"
            size="xl"
            callback={() => {
              if (!word) {
                return;
              }
              setWords(words.slice(1));
              setWord(words[0]);
              setUsedWords(usedWords + 1);
              if (word.wordTranslate !== translate) {
                setCorrect([...learnedWords, word]);
                setScore(score + 10 * multiplier);
                if (contract === 4) {
                  setContract(0);
                  setMultiplier(multiplier + 1);
                } else {
                  setContract(contract + 1);
                }
                if (isAuth) {
                  if (word.userWord) {
                    if (word.userWord.difficulty === 'default') {
                      if (word.userWord.optional.withoutMistakes === 2) {
                        setLearnedWords([...learnedWords, word]);
                        updateWord(
                          word._id,
                          'learned',
                          word.userWord.optional.correct + 1,
                          word.userWord.optional.misses,
                          word.userWord.optional.withoutMistakes + 1,
                        );
                      } else {
                        updateWord(
                          word._id,
                          'default',
                          word.userWord.optional.correct + 1,
                          word.userWord.optional.misses,
                          word.userWord.optional.withoutMistakes + 1,
                        );
                      }
                    } else if (word.userWord.difficulty === 'hard') {
                      if (word.userWord.optional.withoutMistakes === 4) {
                        setLearnedWords([...learnedWords, word]);
                        updateWord(
                          word._id,
                          'learned',
                          word.userWord.optional.correct + 1,
                          word.userWord.optional.misses,
                          word.userWord.optional.withoutMistakes + 1,
                        );
                      } else {
                        updateWord(
                          word._id,
                          'hard',
                          word.userWord.optional.correct + 1,
                          word.userWord.optional.misses,
                          word.userWord.optional.withoutMistakes + 1,
                        );
                      }
                    } else if (word.userWord.difficulty === 'learned') {
                      updateWord(
                        word._id,
                        'learned',
                        word.userWord.optional.correct + 1,
                        word.userWord.optional.misses,
                        word.userWord.optional.withoutMistakes + 1,
                      );
                    }
                  } else {
                    API.addToUserWord(
                      userId,
                      word._id,
                      {
                        difficulty: 'default',
                        optional: {
                          correct: 1,
                          misses: 0,
                          withoutMisses: 1,
                        },
                      },
                      token,
                    );
                  }
                } else {
                  setLearnedWords([...learnedWords, word]);
                }
              } else {
                setMisses([...learnedWords, word]);
                setContract(0);
                setMultiplier(1);
                if (isAuth) {
                  if (word.userWord) {
                    if (word.userWord.difficulty === 'learned') {
                      updateWord(
                        word._id,
                        'default',
                        word.userWord.optional.correct,
                        word.userWord.optional.misses + 1,
                        0,
                      );
                    } else {
                      updateWord(
                        word._id,
                        word.userWord.difficulty,
                        word.userWord.optional.correct,
                        word.userWord.optional.misses + 1,
                        0,
                      );
                    }
                  } else {
                    API.addToUserWord(
                      userId,
                      word._id,
                      {
                        difficulty: 'default',
                        optional: {
                          correct: 0,
                          misses: 1,
                          withoutMistakes: 0,
                        },
                      },
                      token,
                    );
                  }
                }
              }
            }}
          >
            Неверно
          </PrimaryButton>
        </div>
      )}

      {/* : (
        <div>
          <PrimaryButton
            color="orange"
            size="l"
            disabled={!words.length}
            callback={() => {
              setWords(words.slice(1));
              setWord(words[0]);
              setGameStarted(true);
            }}
          >
            Начать игру
          </PrimaryButton>
        </div>
      ) */}
    </div>
  );
}
