import { Link, LinkProps } from "expo-router"
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";


export default function TextLink(props: LinkProps) {
  const { style, children } = props;
  const theme = useTheme();

  return (
    <Link
      {...props}
      style={[styles.link, { color: theme.colors.primary }, style]}
    >
      {children}
    </Link>
  )
}


const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
  },
})