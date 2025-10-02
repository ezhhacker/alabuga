import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Artifact } from '../../types';

interface ArtifactsState {
  artifacts: Artifact[];
  userArtifacts: Artifact[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ArtifactsState = {
  artifacts: [],
  userArtifacts: [],
  isLoading: false,
  error: null,
};

const artifactsSlice = createSlice({
  name: 'artifacts',
  initialState,
  reducers: {
    setArtifacts: (state, action: PayloadAction<Artifact[]>) => {
      state.artifacts = action.payload;
    },
    setUserArtifacts: (state, action: PayloadAction<Artifact[]>) => {
      state.userArtifacts = action.payload;
    },
    addUserArtifact: (state, action: PayloadAction<Artifact>) => {
      if (!state.userArtifacts.find(a => a.id === action.payload.id)) {
        state.userArtifacts.push(action.payload);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearArtifacts: (state) => {
      state.artifacts = [];
      state.userArtifacts = [];
      state.error = null;
    },
  },
});

export const {
  setArtifacts,
  setUserArtifacts,
  addUserArtifact,
  setLoading,
  setError,
  clearArtifacts,
} = artifactsSlice.actions;

export default artifactsSlice.reducer;
