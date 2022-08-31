import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { API } from '../../api/api';

import { IWord } from '../../api/api.types';

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
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  useEffect(() => {
    setTranslate(Math.random() >= 0.5 ? words[5]?.wordTranslate || '' : word?.wordTranslate || '');
  }, [word]);
  useEffect(() => {
    if (isAuth) {
      API.getAggregatedWords(userId, token, `{"page": ${page}, "group": ${state?.group}}`).then(
        (res) => {
          setWords([...words, ...res.data[0].paginatedResults]);
        },
      );
    } else {
      API.getWords(page, state?.group).then((res) => {
        setWords([...words, ...res.data]);
      });
    }
  }, [page]);

  useEffect(() => {
    if (words.length < 2) {
      setPage(page === 30 ? 1 : page + 1);
    }
  }, [words]);

  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [seconds, gameStarted]);

  return (
    <div>
      {gameStarted ? (
        <>
          {' '}
          <h1>{page}</h1>
          <h3>{seconds}</h3>
          <div>{word?.word}</div>
          <div>{translate}</div>
          <button
            onClick={() => {
              setWords(words.slice(1));
              setWord(words[0]);
              if (word?.wordTranslate === translate) {
                console.log('ПРАВИЛЬНО');
              } else {
                console.log('НЕПРАВИЛЬНО');
              }
            }}
          >
            Верно
          </button>
          <button
            onClick={() => {
              setWords(words.slice(1));
              setWord(words[0]);
              if (word?.wordTranslate !== translate) {
                console.log('ПРАВИЛЬНО');
              } else {
                console.log('НЕПРАВИЛЬНО');
              }
            }}
          >
            Неверно
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            setWords(words.slice(1));
            setWord(words[0]);
            setGameStarted(true);
          }}
        >
          Start game
        </button>
      )}
    </div>
  );
}
