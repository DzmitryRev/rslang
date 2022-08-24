import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// import type { PayloadAction } from '@reduxjs/toolkit';

// MOCK!

export interface MockResponse {
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

export enum Groups {
  'A1',
  'A2',
  'B1',
  'B2',
  'C1',
  'C2',
}

export const getWords = createAsyncThunk('counter/fetchWords', async (group: number) => {
  const response = await fetch(`http://localhost:8080/words/?group=${group}`);
  const res: MockResponse[] = await response.json();
  return res;
});

// =============================

interface TextbookState {
  page: number;
  numberOfPages: number;
  group: number;
  words: MockResponse[];
}

const initialState: TextbookState = {
  page: 1,
  numberOfPages: 0,
  group: 0,
  words: [],
};

const textbookSlice = createSlice({
  name: 'textbook',
  initialState,
  reducers: {
    setGroup: (state, action: PayloadAction<number>) => {
      state.group = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWords.fulfilled, (state, action) => {
      state.words = action.payload;
    });
  },
});

export const { setGroup } = textbookSlice.actions;

export default textbookSlice.reducer;
