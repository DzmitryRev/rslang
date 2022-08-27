import { createSlice } from '@reduxjs/toolkit';

// import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuth: boolean;
  token: string;
  userId: string;
}

const initialState: UserState = {
  isAuth: false,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGEwZjc3ZDgxNzhiMDAxNjgxZjA1ZiIsImlhdCI6MTY2MTYwNDQzMiwiZXhwIjoxNjYxNjE4ODMyfQ.IKOOywbixDN6CZti83gIracgzw4MNUsB8IC-xrLChQE',
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
});

// export const { setUser } = userSlice.actions;

export default userSlice.reducer;
