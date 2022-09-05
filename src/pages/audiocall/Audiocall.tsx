import { useEffect, useState } from 'react';

import { API } from '../../api/api';

import { useGame } from '../../hooks/gamesHook';

import styles from './Audiocall.module.css';

type AudiocallProps = {
  isAuth: boolean;
  token: string;
  userId: string;
};

export default function Audiocall({ isAuth, userId, token }: AudiocallProps) {
  const { fields, actions } = useGame(userId, token, isAuth);
  const [translates, setTranslates] = useState<string[]>([]);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [answer, setAnswer] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const wordsWithoutCorrect = fields.words.filter(
      (item) => item.wordTranslate !== fields.word?.wordTranslate,
    );
    setTranslates(
      [
        // randomNumber(0, words.length - 1)
        wordsWithoutCorrect[1]?.wordTranslate || '',
        wordsWithoutCorrect[2]?.wordTranslate || '',
        wordsWithoutCorrect[3]?.wordTranslate || '',
        fields.word?.wordTranslate || '',
      ].sort(() => Math.random() - 0.5),
    );
  }, [fields.word]);

  useEffect(() => {
    if (fields.word) {
      const audio = new Audio(`https://react-learnwords-rsl.herokuapp.com/${fields.word.audio}`);
      audio.play();
    }
  }, [fields.word]);

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
        <div>
          {/* Слово на английском (h1 нужно точно убрать и поставить нужный тег) */}
          <h1>Слово: {fields.word?.word}</h1>
          <div>
            {answer && (
              <img
                src={'https://react-learnwords-rsl.herokuapp.com/' + fields.word?.image}
                alt=""
              />
            )}
          </div>
          {/* Варианты */}
          {translates.map((item, index) => {
            return (
              <div
                key={index}
                className={`${styles.field} ${
                  answer && selected === item && item !== fields.word?.wordTranslate
                    ? styles.miss
                    : ''
                } ${answer && item === fields.word?.wordTranslate ? styles.correct : ''}`}
                onClick={() => {
                  if (!fields.word || answer) {
                    return;
                  }
                  actions.setUsedWords(fields.usedWords + 1);
                  setSelected(item);
                  if (fields.word.wordTranslate === item) {
                    actions.setCorrect([...fields.correct, fields.word]);
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
            );
          })}
          {answer ? (
            <button
              onClick={() => {
                if (!fields.word) {
                  return;
                }
                actions.nextWord();
                setAnswer(false);
                setSelected(null);
                if (fields.usedWords === 10) {
                  setGameEnded(true);
                }
              }}
            >
              Дальше
            </button>
          ) : (
            <button
              onClick={() => {
                if (!fields.word) {
                  return;
                }
                actions.nextWord();
                actions.setUsedWords(fields.usedWords + 1);
                actions.setMisses([...fields.misses, fields.word]);
                setAnswer(true);
                setSelected(null);
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
