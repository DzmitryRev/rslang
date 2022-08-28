import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { API } from '../api/api';
import { IUserWordBody } from '../api/api.types';
import { Pagination } from '../components/pagination/Pagination';
import PetalButton from '../components/petal-button/PetalButton';
import PrimaryButton from '../components/primary-button/PrimaryButton';
import WordList from '../components/word-list/WordList';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import {
  getAuthWords,
  getUnauthWords,
  Groups,
  setAudioPlaying,
  setGroup,
  setPage,
} from '../store/slices/textbookSlice';

export default function Textbook() {
  const dispach = useAppDispatch();
  const { token, userId, isAuth, userWords } = useAppSelector((store) => store.user);
  const { words, group, page, audioPlaying } = useAppSelector((store) => store.textbook);

  useEffect(() => {
    if (isAuth) {
      dispach(getAuthWords({ userId, token, page, group }));
    } else {
      dispach(getUnauthWords({ page, group }));
    }
  }, [page, group, userId, isAuth, token, dispach]);

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

  const availableGroups = Object.values(Groups).filter((item) => !isNaN(+item)) as number[];

  const allWordsLearned = words.filter((word) => !word.userWord);

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

      <h1>{page}</h1>

      {/* all words learned marker */}
      {allWordsLearned.length === 0 ? <div>Все слова на этой странице изучены!</div> : ''}

      {/* words */}
      <WordList
        words={words}
        userWords={userWords}
        addToUserWords={addToUserWords}
        updateUserWord={updateUserWord}
        isAuth={isAuth}
        audioPlaying={audioPlaying}
        setAudioPlaying={(condition) => {
          dispach(setAudioPlaying(condition));
        }}
      />

      {/* pagination */}
      <Pagination
        page={page}
        totalPages={30}
        handlePagination={(page) => {
          dispach(setPage(page));
        }}
      />
      {/* ... */}
    </div>
  );
}
