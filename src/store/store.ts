import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import textbookReducer from './slices/textbookSlice';

const store = configureStore({
  reducer: {
    // example:
    // one: oneSlice.reducer,
    // two: twoSlice.reducer,
    user: userReducer,
    textbook: textbookReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
