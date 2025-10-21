import { Button, Dialog, Portal, Surface, Text, TextInput, useTheme } from "react-native-paper";
import { Modal, StyleSheet, View } from "react-native";


interface Props {
  visible: boolean,
  onDismiss: () => void,
}


// TODO: Add message telling user to install browser script if necessary
export default function SignInDialog({ visible, onDismiss }: Props) {
  const theme = useTheme();

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
          />
          <TextInput
            label="Password"
            mode="outlined"
            style={{ backgroundColor: theme.colors.elevation.level3 }}
            secureTextEntry
          />
        </Dialog.Content>

        <Dialog.Actions>
          <Button>Sign in</Button>
          <Button onPress={onDismiss}>Cancel</Button>
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