import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { API } from '../api/api';

import { IWord } from '../api/api.types';

type GamesLocationState = {
  group: number;
  page: number;
};

export function useGame(userId: string, token: string, isAuth: boolean) {
  const location = useLocation();
  const state = location.state as GamesLocationState;
  const navigate = useNavigate();
  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [navigate, state]);
  const [words, setWords] = useState<IWord[]>([]);
  const [word, setWord] = useState<IWord | null>(null);
  const [usedWords, setUsedWords] = useState<number>(0);
  const [learnedWords, setLearnedWords] = useState<IWord[]>([]);
  const [misses, setMisses] = useState<IWord[]>([]);
  const [correct, setCorrect] = useState<IWord[]>([]);
  const [page, setPage] = useState<number>(state?.page);

  useEffect(() => {
    if (isAuth) {
      API.getAggregatedWords(
        userId,
        token,
        `{"page": ${state.page - 1}, "group": ${state?.group}}`,
      ).then((res) => {
        setWords(res.data[0].paginatedResults.sort(() => Math.random() - 0.5));
      });
    } else {
      API.getWords(state.page - 1, state?.group).then((res) => {
        setWords([...words, ...res.data]);
      });
    }
  }, [page]);

  useEffect(() => {
    setWord(words[0] || null);
  }, [words]);

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

  function nextWord() {
    setWords([...words.slice(1)]);
    setWord(words[0]);
  }

  function correctAnswer(difficulty: 'default' | 'learned' | 'hard') {
    if (!word || !word.userWord) return;
    updateWord(
      word._id,
      difficulty,
      word.userWord.optional.correct + 1,
      word.userWord.optional.misses,
      word.userWord.optional.withoutMistakes + 1,
    );
  }

  function addToLearnedWords() {
    if (!word || !word.userWord) return;
    setLearnedWords([...learnedWords, word]);
    updateWord(
      word._id,
      'learned',
      word.userWord.optional.correct + 1,
      word.userWord.optional.misses,
      word.userWord.optional.withoutMistakes + 1,
    );
  }

  function addToUserWords(condition: 'correct' | 'miss') {
    if (!word) return;
    API.addToUserWord(
      userId,
      word._id,
      {
        difficulty: 'default',
        optional: {
          correct: condition === 'correct' ? 1 : 0,
          misses: condition === 'correct' ? 0 : 1,
          withoutMisses: condition === 'correct' ? 1 : 0,
        },
      },
      token,
    );
  }
  function missWord() {
    if (!word || !word.userWord) return;
    updateWord(
      word._id,
      'default',
      word.userWord.optional.correct,
      word.userWord.optional.misses + 1,
      0,
    );
  }

  return {
    fields: { words, word, usedWords, learnedWords, correct, misses, page },
    actions: {
      nextWord,
      setUsedWords,
      setLearnedWords,
      setCorrect,
      setMisses,
      updateWord,
      correctAnswer,
      addToLearnedWords,
      addToUserWords,
      missWord,
      setPage,
    },
  };
}
