import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import missionsReducer from './slices/missionsSlice';
import storeReducer from './slices/storeSlice';
import artifactsReducer from './slices/artifactsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    missions: missionsReducer,
    store: storeReducer,
    artifacts: artifactsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
