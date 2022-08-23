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

import WordCard from '../components/WordCard';
import { useAppSelector } from '../hooks/storeHooks';

export default function Textbook() {
  const isAuth = useAppSelector((store) => store.user.isAuth);
  const mockWords = [
    {
      word: 'Word',
      translate: 'translate',
      transcription: 'transcription',
      textMeaning: 'textMeaning',
      textExample: 'textExample',
      textMeaningTranslate: 'textMeaningTranslate',
      textExampleTranslate: 'textExampleTranslate',
      image: 'image',
    },
  ];
  return (
    <div>
      {isAuth ? (
        <div>Textbook true</div>
      ) : (
        <div>
          {mockWords.map((item) => {
            return (
              <WordCard
                word={item.word}
                translate={item.translate}
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
