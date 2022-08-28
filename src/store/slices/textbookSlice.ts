import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { API } from '../../api/api';
import { IAggregatedWord, IUserWord, IWord } from '../../api/api.types';

// import type { PayloadAction } from '@reduxjs/toolkit';

export enum Groups {
  'A1',
  'A2',
  'B1',
  'B2',
  'C1',
  'C2',
}

export const getUnauthWords = createAsyncThunk<IWord[], { page: number; group: number }, {}>(
  'counter/fetchUnauthWords',
  async (params) => {
    const { page, group } = params;
    const response = await API.getWords(page, group);
    const data: IWord[] = response.data;
    return data;
  },
);
export const getAuthWords = createAsyncThunk<
  IWord[],
  { userId: string; token: string; page: number; group: number },
  {}
>('counter/fetchAuthWords', async (params) => {
  const { userId, token, page, group } = params;
  const response = await API.getAggregatedWords(
    userId,
    token,
    `{"page": ${page}, "group": ${group}}`,
  );
  const [{ paginatedResults }]: IAggregatedWord[] = response.data;
  return paginatedResults;
});

interface TextbookState {
  page: number;
  numberOfPages: number;
  group: number;
  words: IWord[];
  audioPlaying: boolean;
}

const initialState: TextbookState = {
  page: 1,
  numberOfPages: 0,
  group: 0,
  words: [],
  audioPlaying: false,
};

const textbookSlice = createSlice({
  name: 'textbook',
  initialState,
  reducers: {
    setGroup: (state, action: PayloadAction<number>) => {
      state.group = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setAudioPlaying: (state, action: PayloadAction<boolean>) => {
      state.audioPlaying = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUnauthWords.fulfilled, (state, action) => {
        state.words = action.payload;
        window.scrollTo(0, 0);
      })
      .addCase(getAuthWords.fulfilled, (state, action) => {
        state.words = action.payload;
        window.scrollTo(0, 0);
      });
  },
});

export const { setGroup, setPage, setAudioPlaying } = textbookSlice.actions;

export default textbookSlice.reducer;
