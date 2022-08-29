import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';

import { API } from '../../api/api';

import { ILoginResponse, IRegistrationResponse, IUserWord, UserType } from '../../api/api.types';

interface UserState {
  isAuth: boolean;
  token: string;
  userId: string;
  userWords: IUserWord[];
  isLoading: boolean;
  error: boolean;
}

const initialState: UserState = {
  isAuth: false,
  userWords: [],
  token: '',
  userId: '',
  isLoading: false,
  error: false,
};

export const login = createAsyncThunk<ILoginResponse, Omit<UserType, 'name'>, {}>(
  'counter/login',
  async (params, { rejectWithValue }) => {
    const { email, password } = params;
    try {
      const response = await API.signin({ email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue('');
    }
  },
);

export const registration = createAsyncThunk<IRegistrationResponse, UserType, {}>(
  'counter/registration',
  async (params, { rejectWithValue }) => {
    const { name, email, password } = params;
    try {
      const response = await API.createUser({ name, email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue('');
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(registration.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(registration.fulfilled, (state) => {
        state.error = false;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(registration.rejected, (state, action) => {
        state.error = true;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
