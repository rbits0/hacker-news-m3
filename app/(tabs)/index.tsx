import { StyleSheet, View } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';


export default function Index() {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>
      <Button
        mode="contained"
        onPress={() => {}}
        labelStyle={styles.buttonText}
      >
        Hello
      </Button>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 24,
  },
});