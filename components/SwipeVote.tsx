import { MAX_POST_WIDTH } from "@/app/_layout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import Reanimated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";


const MAX_WIDTH = MAX_POST_WIDTH;


export default function SwipeVote(
  progress: SharedValue<number>,
  translation: SharedValue<number>,
  voted: boolean | undefined,
) {
  const theme = useTheme();
  const iconName = voted ? "arrow-up-bold" : "arrow-up-bold-outline";

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translation.value + MAX_WIDTH }]
    }
  });

  return (
    <Reanimated.View style={animatedStyle}>
      <View style={[styles.container, { backgroundColor: theme.colors.primary }]} >
        <View style={styles.innerContainer} >
          <MaterialCommunityIcons name={iconName} color={theme.colors.onPrimary} size={48} />
        </View>
      </View>
    </Reanimated.View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: MAX_WIDTH,
    height: '100%',
    flexDirection: 'row',
  },
  innerContainer: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});