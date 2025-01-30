import { MaterialSwitchListItem } from '@/components/MaterialSwitchListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { List, useTheme } from 'react-native-paper';


interface Settings {
  displayVotes: boolean,
}


export default function SettingsPage() {
  const theme = useTheme();

  const [settings, setSettings] = useState<Settings | undefined>(undefined);
  
  useEffect(() => {
    loadSettings().then(value => {
      setSettings(value)
    });
  }, []);

  function modifySetting
    <K extends keyof Settings, V extends Settings[K]>
    (key: K, value: V)
  {
    setSettings(settings => {
      if (settings === undefined) {
        return undefined;
      }

      const newSettings = { ...settings, [key]: value };
      const json = JSON.stringify(newSettings);
      try {
        AsyncStorage.setItem('settings', json);
      } catch {
        console.error('Failed to store settings');
      }

      return newSettings;
    })
  }

  function toggleSetting<K extends keyof Settings>(key: K) {
    if (settings === undefined) {
      return;
    }

    const oldValue = settings[key];
    if (typeof oldValue !== 'boolean') {
      console.error('toggleSetting value must be a boolean');
      return;
    }

    modifySetting(key, !oldValue);
  }
  

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <List.Section>

        <List.Subheader>Posts</List.Subheader>
        <MaterialSwitchListItem
          title="Display votes"
          selected={settings ? settings.displayVotes : DEFAULT_SETTINGS.displayVotes}
          onPress={() => toggleSetting('displayVotes')}
        />
      </List.Section>
    </View>
  );
}


const DEFAULT_SETTINGS = {
  displayVotes: true,
}


export async function loadSettings(): Promise<Settings | undefined> {
  try {
    const storedSettings = await AsyncStorage.getItem('settings');
    if (storedSettings !== null) {
      // Settings already initialised
      return JSON.parse(storedSettings);
    }
  } catch {
    console.error('Failed to read stored settings');
    return undefined;
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});