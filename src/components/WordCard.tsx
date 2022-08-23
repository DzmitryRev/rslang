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
    <div>
      <span>{props.word}, </span>
      <span>{props.translate}, </span>
      <span>{props.transcription}, </span>
      <span>{props.textMeaning}, </span>
      <span>{props.textExample}, </span>
      <span>{props.textMeaningTranslate}, </span>
      <span>{props.textExampleTranslate}</span>
      <div>
        Image: <span>{props.image}</span>
      </div>
    </div>
  );
}
