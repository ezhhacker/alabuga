import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Mission } from '../../types';

interface MissionsState {
  missions: Mission[];
  availableMissions: Mission[];
  completedMissions: Mission[];
  currentMission: Mission | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MissionsState = {
  missions: [],
  availableMissions: [],
  completedMissions: [],
  currentMission: null,
  isLoading: false,
  error: null,
};

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    setMissions: (state, action: PayloadAction<Mission[]>) => {
      state.missions = action.payload;
    },
    setAvailableMissions: (state, action: PayloadAction<Mission[]>) => {
      state.availableMissions = action.payload;
    },
    setCompletedMissions: (state, action: PayloadAction<Mission[]>) => {
      state.completedMissions = action.payload;
    },
    setCurrentMission: (state, action: PayloadAction<Mission | null>) => {
      state.currentMission = action.payload;
    },
    startMission: (state, action: PayloadAction<number>) => {
      const mission = state.availableMissions.find(m => m.id === action.payload);
      if (mission) {
        state.currentMission = mission;
      }
    },
    completeMission: (state, action: PayloadAction<number>) => {
      const mission = state.missions.find(m => m.id === action.payload);
      if (mission) {
        state.completedMissions.push(mission);
        state.currentMission = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearMissions: (state) => {
      state.missions = [];
      state.availableMissions = [];
      state.completedMissions = [];
      state.currentMission = null;
      state.error = null;
    },
  },
});

export const {
  setMissions,
  setAvailableMissions,
  setCompletedMissions,
  setCurrentMission,
  startMission,
  completeMission,
  setLoading,
  setError,
  clearMissions,
} = missionsSlice.actions;

export default missionsSlice.reducer;
