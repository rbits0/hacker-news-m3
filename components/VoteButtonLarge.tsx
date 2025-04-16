import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";


interface Props {
  disabled?: boolean,
  score: number | undefined,
  onPress: () => void,
}

export default function VoteButtonLarge({ disabled, score, onPress }: Props) {

  return (
    <View>
      <IconButton
        mode="contained"
        size={22}
        icon={({ size, color }) => (
          <MaterialCommunityIcons name="arrow-up-bold-outline" size={30} color={color} style={styles.icon}/>
        )}
        onPress={onPress}
        style={styles.button}
        disabled={disabled}
      />
      <Text variant="bodyLarge" style={styles.scoreText}>{score}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  button: {
    margin: 0,
    marginTop: 8,
  },
  icon: {
    marginTop: -1,
  },
  scoreText: {
    textAlign: "center",
    marginTop: 4,
  },
})