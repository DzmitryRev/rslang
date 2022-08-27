import { IUserWord, IWord } from '../../api/api.types';
import WordCard from '../word-card/WordCard';

type WordListProps = {
  words: IWord[];
  userWords: IUserWord[];
  addToUserWords: (wordId: string, wordSettings: Omit<Omit<IUserWord, 'id'>, 'wordId'>) => void;
  updateUserWord: (wordId: string, wordSettings: Omit<Omit<IUserWord, 'id'>, 'wordId'>) => void;
  isAuth: boolean;
};

export default function WordList({
  words,
  userWords,
  addToUserWords,
  updateUserWord,
  isAuth,
}: WordListProps) {
  return (
    <div>
      {words.map((word) => {
        const includedInUserWords = userWords.filter((userWord) => userWord.wordId === word.id);
        if (includedInUserWords.length === 0) {
          return (
            <WordCard
              key={word.id}
              word={word}
              isAuth={isAuth}
              isDifficult={false}
              isLearned={false}
              difficultCallback={() => {
                addToUserWords(word.id, {
                  difficulty: 'hard',
                  optional: {
                    learned: false,
                  },
                });
              }}
              learnedCallBack={() => {
                addToUserWords(word.id, {
                  difficulty: 'easy',
                  optional: {
                    learned: true,
                  },
                });
              }}
            />
          );
        } else {
          return (
            <WordCard
              key={word.id}
              word={word}
              isAuth={isAuth}
              isDifficult={includedInUserWords[0].difficulty === 'hard' ? true : false}
              isLearned={includedInUserWords[0].optional.learned ? true : false}
              difficultCallback={() => {
                updateUserWord(word.id, {
                  difficulty: 'hard',
                  optional: {
                    learned: false,
                  },
                });
              }}
              learnedCallBack={() => {
                updateUserWord(word.id, {
                  difficulty: 'easy',
                  optional: {
                    learned: true,
                  },
                });
              }}
            />
          );
        }
      })}
      ;
    </div>
  );
}
