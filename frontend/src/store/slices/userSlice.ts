import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Rank, Log, UserStats } from '../../types';

interface UserState {
  currentRank: Rank | null;
  logs: Log[];
  stats: UserStats | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentRank: null,
  logs: [],
  stats: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentRank: (state, action: PayloadAction<Rank>) => {
      state.currentRank = action.payload;
    },
    setLogs: (state, action: PayloadAction<Log[]>) => {
      state.logs = action.payload;
    },
    addLog: (state, action: PayloadAction<Log>) => {
      state.logs.unshift(action.payload);
    },
    setStats: (state, action: PayloadAction<UserStats>) => {
      state.stats = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearUserData: (state) => {
      state.currentRank = null;
      state.logs = [];
      state.stats = null;
      state.error = null;
    },
  },
});

export const {
  setCurrentRank,
  setLogs,
  addLog,
  setStats,
  setLoading,
  setError,
  clearUserData,
} = userSlice.actions;

export default userSlice.reducer;
