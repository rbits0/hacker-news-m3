import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '..';
import { Platform } from 'react-native';

interface Settings {
  displayVotes: boolean;
  commentsLargeVoteButton: boolean;
}

// React Native does not support structuredClone()
function defaultSettings(): Settings {
  return {
    displayVotes: true,
    commentsLargeVoteButton: Platform.select({
      web: true,
      default: false,
    }),
  };
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: defaultSettings(),
  reducers: {
    modifySetting: <K extends keyof Settings, V extends Settings[K]>(
      state: Settings,
      action: PayloadAction<[K, V]>,
    ) => {
      const [key, value] = action.payload;
      state[key] = value;
    },
  },
});

export const { modifySetting } = settingsSlice.actions;
export default settingsSlice.reducer;
