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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGI4MjJiN2U2ZjVhMDAxNjU4NTg4ZiIsImlhdCI6MTY2MTY5ODY1OCwiZXhwIjoxNjYxNzEzMDU4fQ.VauRgDUkcjhn7rLfTpGsOp4ttoMakvkTY3-P8hsv7Nc',
  userId: '630b822b7e6f5a001658588f',
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
