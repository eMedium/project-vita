import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { loadState } from './saves/actions';

export interface GameState {
  day: number;
  month: number;
  year: number;
  cash: number;
  previousDayCash: number;
  diamonds: number;
  yearlyProfits: number[];
  gameSpeed: number;
  taxValue: number;
  initialized: boolean;
  processing: boolean; // Processing flag
  lose: boolean; // Flag to track if the player has lost
  currentFloor: number;
}

const initialState: GameState = {
  day: 1,
  month: 0, // January (0-11)
  year: 1970,
  cash: 100000,
  previousDayCash: 100000, // Initialize with the same value as cash
  diamonds: 0,
  yearlyProfits: [0, 0, 0],
  gameSpeed: 1,
  taxValue: 0,
  initialized: false,
  processing: false,
  lose: false,
  currentFloor: 0,
};



const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(loadState, (state, action: PayloadAction<RootState | undefined>) => {
      return action.payload?.game || state;
    });
  }
});

export const {

} = gameSlice.actions;
export default gameSlice.reducer;
