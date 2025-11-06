import { Button, Dialog, Portal, TextInput, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { checkCanFetchCors, signIn } from "@/lib/hackerNewsAccount";
import { signIn as accountStateSignIn } from "@/store/slices/accountState";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";


interface Props {
  visible: boolean,
  onDismiss: () => void,
}


// TODO: Add message telling user to install browser script if necessary
export default function SignInDialog({
  visible,
  onDismiss,
}: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const canFetchCors = checkCanFetchCors();

  const onSignInPressed = async () => {
    // Disable everything while loading
    setLoading(true);

    let success;
    try {
      success = await signIn(username, password);
    } catch (error) {
      console.error(error);
      setLoading(false);
      // TODO: Show error message
      return;
    }
    
    if (success) {
      dispatch(accountStateSignIn(username));
      onDismiss();

      // Set loading back to false after 0.2s, so it happens after the dialog
      // closing animation finishes.
      setTimeout(() => setLoading(false), 200);
    } else {
      console.error('Failed to sign in');
      setLoading(false);
      // TODO: Show error message
    }
  }

  return (
    <Portal>
      <Dialog
        visible={visible}
        dismissable={true}
        onDismiss={onDismiss}
      >
        <Dialog.Title>Sign in</Dialog.Title>

        <Dialog.Content style={styles.content}>
          <TextInput
            label="Username"
            mode="outlined"
            style={{ backgroundColor: theme.colors.elevation.level3 }}
            disabled={loading || !canFetchCors}
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            label="Password"
            mode="outlined"
            style={{ backgroundColor: theme.colors.elevation.level3 }}
            disabled={loading || !canFetchCors}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </Dialog.Content>

        <Dialog.Actions>
          <Button
            onPress={onSignInPressed}
            disabled={loading || !canFetchCors}
          >
            Sign in
          </Button>
          <Button
            onPress={onDismiss}
            disabled={loading}
          >
            Cancel
          </Button>
        </Dialog.Actions>

      </Dialog>
    </Portal>
  );
}


const styles = StyleSheet.create({
  surface: {
    margin: 'auto',
    padding: 24,
    borderRadius: 28,
    minWidth: '50%',
  },
  content: {
    gap: 16,
  },
});