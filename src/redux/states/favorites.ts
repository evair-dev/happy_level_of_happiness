import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageTypes, Person } from '@/models';
import { getLocalStorage, setLocalStorage } from '@/utilities';

const initialState: Person[] = [];

export const favoriteSlice = createSlice({
  name: LocalStorageTypes.FAVORITES,
  initialState: getLocalStorage(LocalStorageTypes.FAVORITES)
    ? JSON.parse(getLocalStorage(LocalStorageTypes.FAVORITES) as string)
    : initialState,
  reducers: {
    addFavorites: (state, action: PayloadAction<Person>) => {
      state.push(action.payload);
      setLocalStorage(LocalStorageTypes.FAVORITES, action.payload);
    },
    removeFavorites: (state, action: PayloadAction<Person>) => {
      const filteredState = state.filter((p: Person) => p.id !== action.payload.id);
      setLocalStorage(LocalStorageTypes.FAVORITES, filteredState);
      return filteredState;
    }
  }
});

export const { addFavorites, removeFavorites } = favoriteSlice.actions;
