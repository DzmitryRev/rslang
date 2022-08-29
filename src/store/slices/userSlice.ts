import { createSlice } from '@reduxjs/toolkit';

import { IUserWord } from '../../api/api.types';

// import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuth: boolean;
  token: string;
  userId: string;
  userWords: IUserWord[];
}

const initialState: UserState = {
  isAuth: false,
  userWords: [],
  token: '',
  userId: '',
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
