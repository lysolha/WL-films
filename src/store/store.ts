import { configureStore } from '@reduxjs/toolkit';
import filmReducer from './slices/filmSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    film: filmReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
