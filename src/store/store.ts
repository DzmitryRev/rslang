import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    // example:
    // one: oneSlice.reducer,
    // two: twoSlice.reducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
