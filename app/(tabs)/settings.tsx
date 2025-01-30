import { MaterialSwitchListItem } from '@/components/MaterialSwitchListItem';
import { RootState } from '@/store';
import { toggleSetting } from '@/store/slices/settings';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';


export default function SettingsPage() {
  const theme = useTheme();
  // const [settings, modifySetting, toggleSetting] = useSettings();
  const { settings, isLoaded: settingsIsLoaded } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {settingsIsLoaded ? (
        <List.Section>

          <List.Subheader>Posts</List.Subheader>
          <MaterialSwitchListItem
            title="Display votes"
            selected={settings.displayVotes}
            onPress={() => dispatch(toggleSetting('displayVotes'))}
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