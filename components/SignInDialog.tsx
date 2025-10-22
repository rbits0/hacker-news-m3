import { Button, Dialog, Portal, Surface, Text, TextInput, useTheme } from "react-native-paper";
import { Modal, StyleSheet, View } from "react-native";
import { signIn } from "@/lib/hackerNewsAccount";
import { useState } from "react";


interface Props {
  visible: boolean,
  onDismiss: () => void,
}


// TODO: Add message telling user to install browser script if necessary
export default function SignInDialog({ visible, onDismiss }: Props) {
  const theme = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPressed = async () => {
    try {
      setLoading(true);
      const success = await signIn(username, password);
      
      if (success) {
        onDismiss();

        // Set loading back to false after 0.2s, so it happens after the dialog
        // closing animation finishes.
        setTimeout(() => setLoading(false), 200);
      } else {
        console.error('Failed to sign in');
        setLoading(false);
        // TODO: Show error message
      }
    } catch (e) {
      console.error(e);
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
            disabled={loading}
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            label="Password"
            mode="outlined"
            style={{ backgroundColor: theme.colors.elevation.level3 }}
            disabled={loading}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </Dialog.Content>

        <Dialog.Actions>
          <Button
            onPress={onSignInPressed}
            disabled={loading}
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