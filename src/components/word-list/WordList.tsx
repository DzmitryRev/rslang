import { IUserWord, IWord } from '../../api/api.types';
import WordCard from '../word-card/WordCard';

import styles from './WordList.module.css';


type WordListProps = {
  words: IWord[];
  userWords: IUserWord[];
  addToUserWords: (wordId: string, wordSettings: Omit<Omit<IUserWord, 'id'>, 'wordId'>) => void;
  updateUserWord: (wordId: string, wordSettings: Omit<Omit<IUserWord, 'id'>, 'wordId'>) => void;
  isAuth: boolean;
  isDifficultPage: boolean;
  audioPlaying: boolean;
  setAudioPlaying: (condition: boolean) => void;
};

export default function WordList({
  words,
  addToUserWords,
  updateUserWord,
  setAudioPlaying,
  audioPlaying,
  isAuth,
  isDifficultPage,
}: WordListProps) {
  return (
    <div className={styles.wordlist}>
      {words.map((word) => {
        if (isAuth) {
          if (word.userWord) {
            return (
              <WordCard
                key={word._id}
                word={word}
                isAuth={true}
                isDifficultPage={isDifficultPage}
                audioPlaying={audioPlaying}
                setAudioPlaying={setAudioPlaying}
                difficultCallback={() => {
                  updateUserWord(word._id, {
                    difficulty: 'hard',
                    optional: {},
                  });
                }}
                learnedCallBack={() => {
                  updateUserWord(word._id, {
                    difficulty: 'learned',
                    optional: {},
                  });
                }}
                removeFromDifficult={() => {
                  updateUserWord(word._id, {
                    difficulty: 'default',
                    optional: {},
                  });
                }}
              />
            );
          } else {
            return (
              <WordCard
                key={word._id}
                word={word}
                isAuth={true}
                isDifficultPage={isDifficultPage}
                audioPlaying={audioPlaying}
                setAudioPlaying={setAudioPlaying}
                difficultCallback={() => {
                  addToUserWords(word._id, {
                    difficulty: 'hard',
                    optional: {},
                  });
                }}
                learnedCallBack={() => {
                  addToUserWords(word._id, {
                    difficulty: 'learned',
                    optional: {},
                  });
                }}
                removeFromDifficult={() => {}}
              />
            );
          }
        } else {
          return (
            <WordCard
              key={word.id}
              audioPlaying={audioPlaying}
              setAudioPlaying={setAudioPlaying}
              word={word}
              isAuth={false}
            />
          );
        }
      })}
      ;
    </div>
  );
}
