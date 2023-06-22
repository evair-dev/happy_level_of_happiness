import { Person } from '@/models';
import { configureStore } from '@reduxjs/toolkit';
import {favoriteSlice, peopleSlice} from '@/redux/states';

export interface AppState {
  people: Person[];
  favorites: Person[];
}

export default configureStore<AppState>({
  reducer: {
    people: peopleSlice.reducer,
    favorites: favoriteSlice.reducer
  }
});
