/**
 * Textbook have 2 conditions:
 * auth and not auth => get this flag from userSlice
 * Components:
 * 1. Header
 * 2. Footer
 * 3. WordCard +
 * 4.
 *
 */

import { useEffect } from 'react';

import NeonButton from '../components/NeonButton/NeonButton';

import WordCard from '../components/WordCard';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { getWords, Groups, setGroup } from '../store/slices/textbookSlice';

export default function Textbook() {
  const dispach = useAppDispatch();
  const isAuth = useAppSelector((store) => store.user.isAuth);
  const mockWords = useAppSelector((store) => store.textbook.words);
  const group = useAppSelector((store) => store.textbook.group);
  const page = useAppSelector((store) => store.textbook.page);
  useEffect(() => {
    dispach(getWords(group));
  }, [group, dispach]);

  const availableGroups = Object.values(Groups).filter((item) => !isNaN(+item)) as number[];
  console.log(availableGroups);
  return (
    <div>
      {isAuth ? (
        <div>Textbook true</div>
      ) : (
        <div>
          {availableGroups.map((group) => {
            return (
              <NeonButton
                onClick={() => {
                  dispach(setGroup(group));
                }}
                title={Groups[group]}
                key={group}
              />
            );
          })}
          {mockWords.map((item) => {
            /**
             * if(userWord.id === item.id)
             * difficult = item.difficult
             * AllInGames = item.opt.allinGames
             * trueInGames = item.opt.trueIngames
             * learned = item.opt.learned
             */
            return (
              <WordCard
                key={item.id}
                word={item.word}
                translate={item.wordTranslate}
                transcription={item.transcription}
                textMeaning={item.textMeaning}
                textExample={item.textExample}
                textMeaningTranslate={item.textMeaningTranslate}
                textExampleTranslate={item.textExampleTranslate}
                image={item.image}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
