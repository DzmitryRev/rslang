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
  isAuth: true,
  userWords: [],
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGJhYmYyMmYyM2YwMDAxNjgwYzNlYiIsImlhdCI6MTY2MTcwOTM0MiwiZXhwIjoxNjYxNzIzNzQyfQ.E58C8DRnopA0Ob6h1kuevyoHOlYg2UMfkJ4El7D2MZU',
  userId: '630babf22f23f0001680c3eb',
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
