import { IUserWord, IWord } from '../../api/api.types';
import WordCard from '../word-card/WordCard';

type WordListProps = {
  words: IWord[];
  userWords: IUserWord[];
  addToUserWords: (wordId: string, wordSettings: Omit<Omit<IUserWord, 'id'>, 'wordId'>) => void;
  updateUserWord: (wordId: string, wordSettings: Omit<Omit<IUserWord, 'id'>, 'wordId'>) => void;
  isAuth: boolean;
};

export default function WordList({ words, addToUserWords, updateUserWord, isAuth }: WordListProps) {
  return (
    <div>
      {words.map((word) => {
        if (isAuth) {
          if (word.userWord) {
            return (
              <WordCard
                key={word._id}
                word={word}
                isAuth={true}
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
              />
            );
          } else {
            return (
              <WordCard
                key={word._id}
                word={word}
                isAuth={true}
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
              />
            );
          }
        } else {
          return <WordCard key={word.id} word={word} isAuth={false} />;
        }
      })}
      ;
    </div>
  );
}
