import { MaterialSwitchListItem } from '@/components/MaterialSwitchListItem';
import useSettings from '@/hooks/useSettings';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { List, useTheme } from 'react-native-paper';


export default function SettingsPage() {
  const theme = useTheme();
  const [settings, modifySetting, toggleSetting] = useSettings();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {settings ? (
        <List.Section>

          <List.Subheader>Posts</List.Subheader>
          <MaterialSwitchListItem
            title="Display votes"
            selected={settings.displayVotes}
            onPress={() => toggleSetting('displayVotes')}
          />

        </List.Section>
      ) : null}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});