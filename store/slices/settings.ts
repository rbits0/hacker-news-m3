import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import { Platform } from "react-native";


interface Settings {
  displayVotes: boolean,
  commentsLargeVoteButton: boolean,
}

interface State {
  settings: Settings,
  isLoaded: boolean,
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
  initialState: {
    settings: defaultSettings(),
    isLoaded: false,
  },
  reducers: {

    modifySetting: <K extends keyof Settings, V extends Settings[K]>(
      state: State, action: PayloadAction<[K, V]>
    ) => {
      const [key, value] = action.payload;
      state.settings[key] = value;

      // Only store the settings if settings is loaded
      // Otherwise you will overwrite the stored settings
      if (state.isLoaded) {
        storeSettings(state.settings);
      }
    },

    toggleSetting: <K extends keyof Settings>(state: State, action: PayloadAction<K>) => {
      const key = action.payload;
      const oldValue = state.settings[key];
      if (typeof oldValue !== 'boolean') {
        console.error('toggleSetting value must be a boolean');
        return;
      }

      state.settings[key] = !state.settings[key];

      // Only store the settings if settings is loaded
      // Otherwise you will overwrite the stored settings
      if (state.isLoaded) {
        storeSettings(state.settings);
      }
    },

    _settingsLoaded: (_state: State, action: PayloadAction<Settings>): State => {
      const settings = action.payload;
      return {
        settings,
        isLoaded: true,
      };
    },
  }
});


const { _settingsLoaded } = settingsSlice.actions;

export const loadSettings = () => async (dispatch: AppDispatch) => {
  try {
    const storedSettings = await AsyncStorage.getItem('settings');
    if (storedSettings !== null) {
      // Settings already initialised

      // Add any missing fields to the settings
      let parsedSettings = {
        ...defaultSettings(),
        ...JSON.parse(storedSettings),
      }
      dispatch(_settingsLoaded(parsedSettings));
      return;
    }
  } catch {
    console.error('Failed to read stored settings');
  }

  // Initialise settings
  const json = JSON.stringify(defaultSettings());

  try {
    await AsyncStorage.setItem('settings', json);
  } catch {
    console.error('Failed to store settings');
  }

  dispatch(_settingsLoaded(defaultSettings()));
}


async function storeSettings(settings: Settings) {
  const json = JSON.stringify(settings);
  try {
    AsyncStorage.setItem('settings', json);
  } catch {
    console.error('Failed to store settings');
  }
}


export const { modifySetting, toggleSetting } = settingsSlice.actions;
export default settingsSlice.reducer;