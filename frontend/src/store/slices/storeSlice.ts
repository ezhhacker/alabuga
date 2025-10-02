import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreItem } from '../../types';

interface StoreState {
  items: StoreItem[];
  purchasedItems: number[];
  isLoading: boolean;
  error: string | null;
}

const initialState: StoreState = {
  items: [],
  purchasedItems: [],
  isLoading: false,
  error: null,
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<StoreItem[]>) => {
      state.items = action.payload;
    },
    setPurchasedItems: (state, action: PayloadAction<number[]>) => {
      state.purchasedItems = action.payload;
    },
    purchaseItem: (state, action: PayloadAction<number>) => {
      if (!state.purchasedItems.includes(action.payload)) {
        state.purchasedItems.push(action.payload);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearStore: (state) => {
      state.items = [];
      state.purchasedItems = [];
      state.error = null;
    },
  },
});

export const {
  setItems,
  setPurchasedItems,
  purchaseItem,
  setLoading,
  setError,
  clearStore,
} = storeSlice.actions;

export default storeSlice.reducer;
