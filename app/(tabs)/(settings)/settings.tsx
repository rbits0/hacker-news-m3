import { MaterialSwitchListItem } from '@/components/MaterialSwitchListItem';
import SignInOutButton from '@/components/SignInOutButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { modifySetting } from '@/store/slices/settings';
import { StyleSheet, View } from 'react-native';
import { List, useTheme } from 'react-native-paper';

export default function SettingsPage() {
  const theme = useTheme();
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <List.Section>
        <List.Subheader>Posts</List.Subheader>
        <MaterialSwitchListItem
          title="Display votes"
          selected={settings.displayVotes}
          onPress={() =>
            dispatch(modifySetting(['displayVotes', !settings.displayVotes]))
          }
        />

        <List.Subheader>Comments</List.Subheader>
        <MaterialSwitchListItem
          title="Large vote button next to comments"
          selected={settings.commentsLargeVoteButton}
          onPress={() =>
            dispatch(
              modifySetting([
                'commentsLargeVoteButton',
                !settings.commentsLargeVoteButton,
              ]),
            )
          }
        />

        <List.Subheader>Account</List.Subheader>
        <SignInOutButton
          onErrorMessage={() => {
            /* TODO: */
          }}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
