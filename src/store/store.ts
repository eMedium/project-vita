import logger from '@/logger/logger';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import { resetState } from './saves/actions';
import { deleteState, getSavesList, loadState, saveState } from './saves/saves';

const appReducer = {
  game: gameReducer,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: any) => {
  if (action.type === resetState.type) {
    logger.info("state really reseted");
    state = undefined;
  }
  return combineReducers(appReducer)(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

// Typy dla RootState i AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Akcje do zapisu, odczytu, pobierania listy i usuwania stanu
export const saveGameState = (name: string) => saveState(name, store.getState());
export const loadGameState = (name: string) => store.dispatch({ type: 'LOAD_STATE', payload: loadState(name) });
export const getGameSaves = () => getSavesList();
export const deleteGameState = (name: string) => deleteState(name);

export default store;
