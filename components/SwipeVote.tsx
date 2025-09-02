import { StyleSheet, View } from "react-native";
import Reanimated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";


const WIDTH = 50;


export default function SwipeVote(
  progress: SharedValue<number>,
  translation: SharedValue<number>,
  voted: boolean | undefined,
) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translation.value + WIDTH }]
    }
  });

  return (
    <Reanimated.View style={animatedStyle}>
      <View style={styles.container} >

      </View>
    </Reanimated.View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    width: WIDTH,
    height: '100%',
  },
});