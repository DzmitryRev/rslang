import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { API } from '../api/api';
import { IUserWord } from '../api/api.types';
import PetalButton from '../components/petal-button/PetalButton';
import PrimaryButton from '../components/primary-button/PrimaryButton';
import WordList from '../components/word-list/WordList';

import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { getWords, Groups, setGroup } from '../store/slices/textbookSlice';
import { getUserWords } from '../store/slices/userSlice';

export default function Textbook() {
  const dispach = useAppDispatch();
  const { token, userId, isAuth, userWords } = useAppSelector((store) => store.user);
  const { words, group, page } = useAppSelector((store) => store.textbook);

  useEffect(() => {
    if (localStorage.getItem('rslang-rev')) {
      dispach(setGroup(JSON.parse(localStorage.getItem('rslang-rev') || '{}')));
    }
    dispach(getWords({ page, group }));
    dispach(getUserWords({ userId, token }));
  }, [group, page, userId, token, dispach]);

  //   move to redux

  const addToUserWords = (wordId: string, body: Omit<Omit<IUserWord, 'id'>, 'wordId'>) => {
    API.addToUserWord(userId, wordId, body, token).then(() => {
      dispach(getUserWords({ userId, token }));
    });
  };
  const updateUserWord = (wordId: string, body: Omit<Omit<IUserWord, 'id'>, 'wordId'>) => {
    API.updateToUserWord(userId, wordId, body, token).then(() => {
      dispach(getUserWords({ userId, token }));
    });
  };

  // ===================

  const availableGroups = Object.values(Groups).filter((item) => !isNaN(+item)) as number[];

  const allWordsLearned = words.filter((word) => {
    return !userWords
      .filter((item) => item.optional.learned)
      .find((userWord) => userWord.wordId === word.id);
  });

  return (
    <div>
      {/* navigation */}
      {availableGroups.map((item) => {
        return (
          <Link to={'/textbook'} key={item}>
            <PetalButton
              shadowColor="blue"
              size="s"
              active={Groups[group] === Groups[item] ? true : false}
              callback={() => {
                dispach(setGroup(item));
              }}
            >
              {Groups[item]}
            </PetalButton>
          </Link>
        );
      })}
      <PrimaryButton color="orange-gradient" size="l">
        Сложные
      </PrimaryButton>

      {/* all words learned marker */}
      {allWordsLearned.length === 0 ? <div>Все слова на этой странице изучены!</div> : ''}

      {/* words */}
      <WordList
        words={words}
        userWords={userWords}
        addToUserWords={addToUserWords}
        updateUserWord={updateUserWord}
        isAuth={isAuth}
      />

      {/* pagination */}
      {/* ... */}
    </div>
  );
}
