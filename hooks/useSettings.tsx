import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


interface Settings {
  displayVotes: boolean,
}

const DEFAULT_SETTINGS: Settings = {
  displayVotes: true,
};


// Returns [settings, modifySetting, toggleSetting]
export default function useSettings(): [
    Settings,
    <K extends keyof Settings, V extends Settings[K]>(key: K, value: V) => void,
    <K extends keyof Settings>(key: K) => void,
  ]
{
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [settingsIsLoaded, setSettingsIsLoaded] = useState(false);
  
  useEffect(() => {
    loadSettings().then(value => {
      setSettings(value);
      setSettingsIsLoaded(true);
    });
  }, []);


  function modifySetting
    <K extends keyof Settings, V extends Settings[K]>
    (key: K, value: V)
  {
    setSettings(settings => {
      const newSettings = { ...settings, [key]: value };
      const json = JSON.stringify(newSettings);
      try {
        // Only set the setting if settings is loaded
        // Otherwise you will overwrite the stored settings
        if (settingsIsLoaded) {
          AsyncStorage.setItem('settings', json);
        }
      } catch {
        console.error('Failed to store settings');
      }

      return newSettings;
    })
  }


  function toggleSetting<K extends keyof Settings>(key: K) {
    const oldValue = settings[key];
    if (typeof oldValue !== 'boolean') {
      console.error('toggleSetting value must be a boolean');
      return;
    }

    modifySetting(key, !oldValue);
  }

  
  return [settings, modifySetting, toggleSetting];
}


async function loadSettings(): Promise<Settings> {
  try {
    const storedSettings = await AsyncStorage.getItem('settings');
    if (storedSettings !== null) {
      // Settings already initialised
      return JSON.parse(storedSettings);
    }
  } catch {
    console.error('Failed to read stored settings');
  }

  // Initialise settings
  const json = JSON.stringify(DEFAULT_SETTINGS);

  try {
    await AsyncStorage.setItem('settings', json);
  } catch {
    console.error('Failed to store settings');
  }

  return structuredClone(DEFAULT_SETTINGS);
}

