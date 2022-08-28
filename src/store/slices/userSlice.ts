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

const initialState: UserState = {
  isAuth: true,
  userWords: [],
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGI0NzkzM2Y4ZjFmMDAxNjNmYjJkMCIsImlhdCI6MTY2MTY4MzYzMiwiZXhwIjoxNjYxNjk4MDMyfQ.p_uVH3KalBMsh8izAIAJfM3h6owowPW8WwtVaf7HXIw',
  userId: '630b47933f8f1f00163fb2d0',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setUser: (state, action: PayloadAction<string>) => {
    //   state.username = action.payload;
    // },
  },
});

export default userSlice.reducer;
