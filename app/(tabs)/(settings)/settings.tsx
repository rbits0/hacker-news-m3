import { MaterialSwitchListItem } from '@/components/MaterialSwitchListItem';
import SignInDialog from '@/components/SignInDialog';
import { checkCanFetchCors, checkIsSignedIn, signOut } from '@/lib/hackerNewsAccount';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { modifySetting } from '@/store/slices/settings';
import { signIn as accountStateSignIn, signOut as accountStateSignOut } from '@/store/slices/accountState';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Button, List, useTheme } from 'react-native-paper';


export default function SettingsPage() {
  const theme = useTheme();
  const settings = useAppSelector(state => state.settings);
  const isSignedIn = useAppSelector(state => state.accountState.isSignedIn);
  const dispatch = useAppDispatch();

  const [signInVisible, setSignInVisible] = useState(false);
  const [signInOutButtonEnabled, setSignInOutButtonEnabled] = useState(checkCanFetchCors());

  useEffect(() => {
    checkIsSignedIn()
      .then(result => {
        if (isSignedIn && !result) {
          // User was signed in, but check says they aren't
          dispatch(accountStateSignOut());
        } else if (!isSignedIn && result) {
          // User wasn't signed in, but check says they are

          if (Platform.OS === 'web') {
            // If on web, this is fine
            console.info('User is already signed in')
            dispatch(accountStateSignIn(null))
            // TODO: Get account username
          } else {
            // If not on web, this shouldn't happen
            console.error('User is signed in when they shouldn\'t be');
            // Try to sign out
            try {
              const result = signOut();
              if (!result) {
                console.error('Failed to sign out');
              }
            } catch (error) {
              console.error('Failed to sign out', error);
            }
          }

        }
      })
      .catch(reason => {
        console.error(reason);
      });
  }, [])

  
  const onSignOutPressed = async () => {
    // Disable button while waiting
    setSignInOutButtonEnabled(false);

    let signOutWasSuccessful
    try {
      signOutWasSuccessful = await signOut();
    } catch (error) {
      // TODO: Show error message
      console.error(error)
    }

    if (signOutWasSuccessful) {
      dispatch(accountStateSignOut());
    } else {
      // TODO: Show error message
      console.error('Failed to sign out')
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