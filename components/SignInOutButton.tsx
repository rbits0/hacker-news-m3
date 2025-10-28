import { checkCanFetchCors, checkIsSignedIn, signOut } from "@/lib/hackerNewsAccount";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signIn as accountStateSignIn, signOut as accountStateSignOut } from '@/store/slices/accountState';
import { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import SignInDialog from "@/components/SignInDialog";


interface Props {
  onErrorMessage: (message: string) => void,
}


export default function SignInOutButton({ onErrorMessage }: Props ) {
  const isSignedIn = useAppSelector(state => state.accountState.isSignedIn);
  const dispatch = useAppDispatch();

  const [signInVisible, setSignInVisible] = useState(false);
  const [enabled, setEnabled] = useState(true);

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
            console.info('User is already signed in');
            dispatch(accountStateSignIn(null));
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
    setEnabled(false);

    let signOutWasSuccessful
    try {
      signOutWasSuccessful = await signOut();
    } catch (error) {
      // TODO: Show error message
      console.error(error);
    }

    if (signOutWasSuccessful) {
      dispatch(accountStateSignOut());
    } else {
      // TODO: Show error message
      console.error('Failed to sign out');
    }

    setEnabled(true);
  };


  return (<>
    {isSignedIn ? (
      <Button
        mode="contained"
        onPress={onSignOutPressed}
        disabled={!enabled}
        style={styles.signInButton}
      >
        Sign out
      </Button>
    ) : (
      <Button
        mode="contained"
        onPress={() => setSignInVisible(true)}
        disabled={!enabled}
        style={styles.signInButton}
      >
        Sign in
      </Button>
    )}

    <SignInDialog
      visible={signInVisible}
      onDismiss={() => setSignInVisible(false)}
    />
  </>);
}


const styles = StyleSheet.create({
  signInButton: {
    width: 'auto',
    marginLeft: 16,
    marginRight: 'auto',
  },
});