import { MaterialSwitchListItem } from '@/components/MaterialSwitchListItem';
import SignInDialog from '@/components/SignInDialog';
import { checkIsSignedIn, signOut } from '@/lib/hackerNewsAccount';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { modifySetting } from '@/store/slices/settings';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Button, List, useTheme } from 'react-native-paper';


export default function SettingsPage() {
  const theme = useTheme();
  const settings = useAppSelector(state => state.settings);
  const dispatch = useAppDispatch();

  const [signInVisible, setSignInVisible] = useState(false);
  // TODO: Set isSignedIn to true on successful sign in
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // TODO: Disable button until sign in state is checked

    checkIsSignedIn()
      .then(result => setIsSignedIn(result))
      .catch(reason => {
        console.error(reason);
      });
  }, [])

  
  const onSignOutPressed = async () => {
    // TODO: Disable button while waiting
    const signOutWasSuccessful = await signOut();
    if (signOutWasSuccessful) {
      setIsSignedIn(false);
    }
  };

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

        <List.Subheader>Account</List.Subheader>
        {isSignedIn ? (
          <Button
            mode="contained"
            onPress={onSignOutPressed}
            style={styles.signInButton}
          >
            Sign out
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={() => setSignInVisible(true)}
            style={styles.signInButton}
          >
            Sign in
          </Button>
        )}

      </List.Section>

      <SignInDialog
        visible={signInVisible}
        onDismiss={() => setSignInVisible(false)}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signInButton: {
    width: 'auto',
    marginLeft: 16,
    marginRight: 'auto',
  },
});