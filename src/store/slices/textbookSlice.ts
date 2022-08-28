import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { API } from '../../api/api';
import { IAggregatedWord, IUserWordBody, IWord } from '../../api/api.types';

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
    const response = await API.getWords(page - 1, group);
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
  if (group === 6) {
    const response = await API.getAggregatedWords(
      userId,
      token,
      '{"userWord.difficulty": "hard"}',
      3600,
    );
    const [{ paginatedResults }]: IAggregatedWord[] = response.data;
    return paginatedResults;
  }
  const response = await API.getAggregatedWords(
    userId,
    token,
    `{"page": ${page - 1}, "group": ${group}}`,
  );
  const [{ paginatedResults }]: IAggregatedWord[] = response.data;
  return paginatedResults;
});

interface TextbookState {
  page: number;
  totalPages: number;
  group: number;
  words: IWord[];
  audioPlaying: boolean;
  loading: boolean;
}

const initialState: TextbookState = {
  page: 1,
  totalPages: 30,
  group: 0,
  words: [],
  audioPlaying: false,
  loading: false,
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(getUnauthWords.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(getAuthWords.pending, (state) => {
    //     state.loading = true;
    //   })
      .addCase(getUnauthWords.fulfilled, (state, action) => {
        state.words = action.payload;
        state.loading = false;
      })
      .addCase(getAuthWords.fulfilled, (state, action) => {
        state.words = action.payload;
        state.loading = false;
      });
  },
});

export const { setGroup, setPage, setAudioPlaying, setLoading } = textbookSlice.actions;

export default textbookSlice.reducer;
