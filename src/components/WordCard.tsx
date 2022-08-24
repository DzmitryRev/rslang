type WordCardProps = {
  word: string;
  translate: string;
  transcription: string;
  textMeaning: string;
  textExample: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  image: string;
};

export default function WordCard(props: WordCardProps) {
  return (
    <div
      style={{ border: '5px solid grey', width: '500px', margin: '20px' }}
    >
      <div>{props.word}, </div>
      <div>{props.translate}, </div>
      <div>{props.transcription}, </div>
      <div>{props.textMeaning}, </div>
      <div>{props.textExample}, </div>
      <div>{props.textMeaningTranslate}, </div>
      <div>{props.textExampleTranslate}</div>
      <div>
        Image: <div>{props.image}</div>
      </div>
    </div>
  );
}
