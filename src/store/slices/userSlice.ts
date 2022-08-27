import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API } from '../../api/api';
import { IUserWord } from '../../api/api.types';

// import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuth: boolean;
  token: string;
  userId: string;
  userWords: IUserWord[];
}

export const getUserWords = createAsyncThunk<IUserWord[], { userId: string; token: string }, {}>(
  'counter/fetchUserWords',
  async (params) => {
    const { userId, token } = params;
    const response = await API.getUserWords(userId, token);
    return response.data;
  },
);

const initialState: UserState = {
  isAuth: true,
  userWords: [],
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGEwZjc3ZDgxNzhiMDAxNjgxZjA1ZiIsImlhdCI6MTY2MTYyNTk5NCwiZXhwIjoxNjYxNjQwMzk0fQ._057mT3mLbTEzX4YO7GvZ-FRivr1jt7ls4Vn5NFwejY',
  userId: '630a0f77d8178b001681f05f',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setUser: (state, action: PayloadAction<string>) => {
    //   state.username = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserWords.fulfilled, (state, action) => {
      state.userWords = action.payload;
    });
  },
});

// export const { setUser } = userSlice.actions;

export default userSlice.reducer;
