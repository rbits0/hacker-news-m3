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
  const [signInOutButtonEnabled, setSignInOutButtonEnabled] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    checkIsSignedIn()
      .then(result => {
        setIsSignedIn(result);
        setSignInOutButtonEnabled(true);
      })
      .catch(reason => {
        console.error(reason);
      });
  }, [])

  
  const onSignOutPressed = async () => {
    // Disable button while waiting
    setSignInOutButtonEnabled(false);

    const signOutWasSuccessful = await signOut();
    // TODO: Show error message if failed to sign out
    if (signOutWasSuccessful) {
      setIsSignedIn(false);
    }

    setSignInOutButtonEnabled(true);
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
            disabled={!signInOutButtonEnabled}
            style={styles.signInButton}
          >
            Sign out
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={() => setSignInVisible(true)}
            disabled={!signInOutButtonEnabled}
            style={styles.signInButton}
          >
            Sign in
          </Button>
        )}

      </List.Section>

      <SignInDialog
        visible={signInVisible}
        onDismiss={() => setSignInVisible(false)}
        onSuccessfulSignIn={() => setIsSignedIn(true)}
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