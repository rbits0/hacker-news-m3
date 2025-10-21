import { MaterialSwitchListItem } from '@/components/MaterialSwitchListItem';
import { useAppSelector } from '@/store/hooks';
import { modifySetting } from '@/store/slices/settings';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';


export default function SettingsPage() {
  const theme = useTheme();
  const settings = useAppSelector(state => state.settings);
  const dispatch = useDispatch();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <List.Section>

        <List.Subheader>Posts</List.Subheader>
        <MaterialSwitchListItem
          title="Display votes"
          selected={settings.displayVotes}
          onPress={() => dispatch(modifySetting(
            ['displayVotes', !settings.displayVotes]
          ))}
        />

        <List.Subheader>Comments</List.Subheader>
        <MaterialSwitchListItem
          title="Large vote button next to comments"
          selected={settings.commentsLargeVoteButton}
          onPress={() => dispatch(modifySetting(
            ['commentsLargeVoteButton', !settings.commentsLargeVoteButton]
          ))}
        />


      </List.Section>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});