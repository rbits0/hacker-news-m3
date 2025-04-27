import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";


export default function TreeLine() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.line, { backgroundColor: theme.colors.outline }]} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: 13,
    // alignItems: 'center',
    paddingLeft: 3,
  },
  line: {
    width: 2,
    height: '100%',
    borderRadius: 2,
  },
});