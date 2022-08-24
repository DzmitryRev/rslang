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
  return (
    <div>
      {isAuth ? (
        <div>Textbook true</div>
      ) : (
        <div>
          {/* TODO: Remove this block */}
          <div
            style={{
              display: 'inline-block',
              width: '100px',
              height: '100px',
              backgroundColor: 'red',
              margin: '20px',
            }}
          >
            Сложное слово!
          </div>
          <div
            style={{
              display: 'inline-block',
              width: '100px',
              height: '100px',
              backgroundColor: 'green',
              margin: '20px',
            }}
          >
            Изученное слово!
          </div>
          {/* ================== */}
          <div
            style={{
              margin: '20px',
            }}
          >
            <button
              onClick={() => {
                dispach(setGroup(0));
              }}
            >
              {Groups[0]}
            </button>
            <button
              onClick={() => {
                dispach(setGroup(1));
              }}
            >
              {Groups[1]}
            </button>
            <button
              onClick={() => {
                dispach(setGroup(2));
              }}
            >
              {Groups[2]}
            </button>
            <button
              onClick={() => {
                dispach(setGroup(3));
              }}
            >
              {Groups[3]}
            </button>
            <button
              onClick={() => {
                dispach(setGroup(4));
              }}
            >
              {Groups[4]}
            </button>
            <button
              onClick={() => {
                dispach(setGroup(5));
              }}
            >
              {Groups[5]}
            </button>
          </div>
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
