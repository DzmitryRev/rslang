import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { API } from '../../api/api';
import { IWord } from '../../api/api.types';

// import type { PayloadAction } from '@reduxjs/toolkit';

// MOCK!

export enum Groups {
  'A1',
  'A2',
  'B1',
  'B2',
  'C1',
  'C2',
}

export const getWords = createAsyncThunk<IWord[], { page: number; group: number }, {}>(
  'counter/fetchWords',
  async (params) => {
    const { page, group } = params;
    const response = await API.getWords(page, group);
    return response.data;
  },
);

// =============================

interface TextbookState {
  page: number;
  numberOfPages: number;
  group: number;
  words: IWord[];
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
