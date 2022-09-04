import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { API } from '../../api/api';

import { IWord } from '../../api/api.types';
import PrimaryButton from '../../components/primary-button/PrimaryButton';
import { randomNumber } from '../../utils/randomNumber';

import styles from './Sprint.module.css';

type AudiocallLocationState = {
  group: number;
  page: number;
};

type AudiocallProps = {
  isAuth: boolean;
  token: string;
  userId: string;
};

export default function Audiocall({ isAuth, userId, token }: AudiocallProps) {
  const location = useLocation();
  const state = location.state as AudiocallLocationState;
  const navigate = useNavigate();
  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [navigate, state]);
  const [words, setWords] = useState<IWord[]>([]);
  const [word, setWord] = useState<IWord | null>(null);
  const [translates, setTranslates] = useState<string[]>([]);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [usedWords, setUsedWords] = useState<number>(0);
  const [learnedWords, setLearnedWords] = useState<IWord[]>([]);
  const [misses, setMisses] = useState<IWord[]>([]);
  const [correct, setCorrect] = useState<IWord[]>([]);
  const [answer, setAnswer] = useState<boolean>(false);

  useEffect(() => {
    setTranslates([
      words[randomNumber(0, words.length - 1)]?.wordTranslate || '',
      words[randomNumber(0, words.length - 1)]?.wordTranslate || '',
      words[randomNumber(0, words.length - 1)]?.wordTranslate || '',
      word?.wordTranslate || '',
    ]);
  }, [word]);

  useEffect(() => {
    if (isAuth) {
      API.getAggregatedWords(
        userId,
        token,
        `{"page": ${state.page - 1}, "group": ${state?.group}}`,
      ).then((res) => {
        // Берет со страницы 10 случайных слов
        setWords(res.data[0].paginatedResults.sort(() => Math.random() - 0.5));
        // Устанавливаем первое слово
      });
    } else {
      API.getWords(state.page - 1, state?.group).then((res) => {
        // Та же логика
        setWords([...words, ...res.data]);
      });
    }
  }, []);

  useEffect(() => {
    setWord(words[0] || null);
    
  }, [words]);

  useEffect(() => {
    if (usedWords === 10) {
      setGameEnded(true);
    }
  }, [usedWords]);

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
                <h4>
                  {item.word} === {item.wordTranslate}
                </h4>
              );
            })}
          </div>

          <div>
            Неправильно ({misses.length}):
            {misses.map((item) => {
              return (
                <h4>
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
                  <h4>
                    {item.word} === {item.wordTranslate}
                  </h4>
                );
              })}
            </h4>
          )}
        </div>
      ) : (
        <div>
          {/* Слово на английском (h1 нужно точно убрать и поставить нужный тег) */}
          <h1>Слово: {word?.word}</h1>
          <div>
            {answer && (
              <img src={'https://react-learnwords-rsl.herokuapp.com/' + word?.image} alt="" />
            )}
          </div>
          {/* Варианты */}
          {translates
            .sort(() => Math.random() - 0.5)
            .map((item) => {
              return (
                <div
                  onClick={() => {
                    if (!word) {
                      return;
                    }
                    // setWords([...words.slice(1)]);
                    // setWord(words[0]);
                    setUsedWords(usedWords + 1);
                    if (word.wordTranslate === item) {
                      setCorrect([...correct, word]);
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
                      setMisses([...misses, word]);
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
                    setAnswer(true);
                  }}
                >
                  {item}
                </div>
              );
            })}
          {answer ? (
            <button
              onClick={() => {
                if (!word) {
                  return;
                }
                setWords([...words.slice(1)]);
                setWord(words[0]);
                setAnswer(false);
              }}
            >
              Дальше
            </button>
          ) : (
            <button
              onClick={() => {
                if (!word) {
                  return;
                }
                setWords([...words.slice(1)]);
                setWord(words[0]);
                setUsedWords(usedWords + 1);
                setMisses([...misses, word]);
                setAnswer(true);
              }}
            >
              Не знаю
            </button>
          )}
        </div>
      )}
    </div>
  );
}
