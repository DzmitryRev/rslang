import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { API } from '../api/api';
import { IUserWordBody } from '../api/api.types';
import PetalButton from '../components/petal-button/PetalButton';
import PrimaryButton from '../components/primary-button/PrimaryButton';
import WordList from '../components/word-list/WordList';

import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { getAuthWords, getUnauthWords, Groups, setGroup } from '../store/slices/textbookSlice';

export default function Textbook() {

  const dispach = useAppDispatch();
  const { token, userId, isAuth, userWords } = useAppSelector((store) => store.user);
  const { words, group, page } = useAppSelector((store) => store.textbook);

  useEffect(() => {
    if (isAuth) {
      dispach(getAuthWords({ userId, token, page, group }));
    } else {
      dispach(getUnauthWords({ page, group }));
    }
  }, [page, group, userId, token, dispach]);

  //   move to redux

  const addToUserWords = (wordId: string, body: IUserWordBody) => {
    API.addToUserWord(userId, wordId, body, token).then(() => {
      dispach(getAuthWords({ userId, token, page, group }));
    });
  };
  const updateUserWord = (wordId: string, body: IUserWordBody) => {
    API.updateToUserWord(userId, wordId, body, token).then(() => {
      dispach(getAuthWords({ userId, token, page, group }));
    });
  };

  console.log('render');

  const availableGroups = Object.values(Groups).filter((item) => !isNaN(+item)) as number[];

  const allWordsLearned = words.filter((word) => !word.userWord);

  //   console.log(allWordsLearned, 'aaa');

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
