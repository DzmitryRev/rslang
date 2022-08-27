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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGEwZjc3ZDgxNzhiMDAxNjgxZjA1ZiIsImlhdCI6MTY2MTYwMzczMSwiZXhwIjoxNjYxNjE4MTMxfQ.4s7JaK9qtUe_c9AWJAQ_R4Pi_7lfso_m_uEWs7LUmfs',
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
