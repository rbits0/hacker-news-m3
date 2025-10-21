import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import HackerNewsM3Icon from "./HackerNewsM3Icon";
import { useState } from "react";


interface Props {
  disabled?: boolean,
  score: number | undefined,
  onPress: () => void,
}

export default function VoteButtonLarge({ disabled, score, onPress }: Props) {
  // TODO: Remove, pass vote state through props instead
  const [voted, setVoted] = useState(false);

  return (
    <View>
      <IconButton
        mode="contained"
        size={22}
        icon={({ color }) => (
          voted ? (
            <HackerNewsM3Icon name="arrow-up-filled" size={26} color={color} />
          ) : (
            <HackerNewsM3Icon name="arrow-up-outline" size={26} color={color} />
          )
        )}
        onPress={() => {
          // TODO: Replace with onPress callback
          setVoted(!voted)
        }}
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
  scoreText: {
    textAlign: "center",
    marginTop: 4,
  },
})