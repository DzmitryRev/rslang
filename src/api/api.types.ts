export type UserType = {
  name: string;
  email: string;
  password: string;
};

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

export interface IUserWord {
  difficulty: string;
  id: string;
  optional: { learned: boolean };
  wordId: string;
}
