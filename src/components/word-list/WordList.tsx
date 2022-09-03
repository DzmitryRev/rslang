import { API } from '../../api/api';
import { IUserWord, IWord } from '../../api/api.types';
import WordCard from '../word-card/WordCard';

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
    <div>
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
                    optional: {
                      correct: word.userWord?.optional.correct || 0,
                      misses: word.userWord?.optional.misses || 0,
                      withoutMistakes: word.userWord?.optional.withoutMistakes || 0,
                    },
                  });
                }}
                learnedCallBack={() => {
                  updateUserWord(word._id, {
                    difficulty: 'learned',
                    optional: {
                      correct: word.userWord?.optional.correct || 0,
                      misses: word.userWord?.optional.misses || 0,
                      withoutMistakes: word.userWord?.optional.withoutMistakes || 0,
                    },
                  });
                }}
                removeFromDifficult={() => {
                  updateUserWord(word._id, {
                    difficulty: 'default',
                    optional: {
                      correct: word.userWord?.optional.correct || 0,
                      misses: word.userWord?.optional.misses || 0,
                      withoutMistakes: word.userWord?.optional.withoutMistakes || 0,
                    },
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
                    optional: {
                      correct: 0,
                      misses: 0,
                      withoutMistakes: 0,
                    },
                  });
                }}
                learnedCallBack={() => {
                  addToUserWords(word._id, {
                    difficulty: 'learned',
                    optional: {
                      correct: 0,
                      misses: 0,
                      withoutMistakes: 0,
                    },
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
