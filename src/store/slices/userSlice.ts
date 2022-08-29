import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

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
  isAuth: false,
  userWords: [],
  token: '',
  userId: '',
};

export const login = createAsyncThunk<
  { token: string; userId: string },
  { email: string; password: string },
  {}
>('counter/login', async (params) => {
  const { email, password } = params;
  const response = await API.signin({ email, password });
  // const data: IWord[] = response.data;
  return response.data;
});

export const registration = createAsyncThunk<
  { userId: string },
  { name: string; email: string; password: string },
  {}
>('counter/registration', async (params) => {
  const { name, email, password } = params;
  const response = await API.createUser({ name, email, password });
  // const data: IWord[] = response.data;
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setUser: (state, action: PayloadAction<string>) => {
    //   state.username = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isAuth = true;
    });
    builder.addCase(registration.fulfilled, () => {
    //   history.push('/');
    });
  },
});

export default userSlice.reducer;
