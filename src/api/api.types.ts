export type UserType = {
  name: string;
  email: string;
  password: string;
};

export interface IWord {
  id: string;
  _id: string;
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
  userWord?: IUserWord;
}

export interface IUserWord {
  difficulty: 'default' | 'hard' | 'learned';
  id: string;
  optional: {
    correct: number;
    misses: number;
    withoutMistakes: number;
  };
  wordId: string;
}

export type IUserWordBody = Omit<Omit<IUserWord, 'id'>, 'wordId'>;

export interface IAggregatedWord {
  paginatedResults: IWord[];
  totalCount: { count: number }[];
}

export interface ILoginResponse {
  message: string;
  name: string;
  refreshToken: string;
  userId: string;
  token: string;
}

export interface IRegistrationResponse {
  email: string;
  id: string;
  name: string;
}
