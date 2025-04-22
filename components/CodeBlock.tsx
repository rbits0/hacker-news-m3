import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";


interface Props {
  style?: StyleProp<ViewStyle>,
}

export default function CodeBlock({ style, children }: PropsWithChildren<Props>) {
  const theme = useTheme();

  return (
    <Surface
      style={[styles.surface, { backgroundColor: theme.colors.elevation.level2 }, style]}
    >
      <Text variant="bodyMedium" style={styles.text}>
        {children}
      </Text>
    </Surface>
  );
}


const styles = StyleSheet.create({
  surface: {
    borderRadius: 8,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    fontFamily: 'monospace'
  },
});