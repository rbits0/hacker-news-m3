import { Text } from "react-native-paper"


interface Props {
  text: string,
}

export default function TextBody({ text }: Props) {
  return <Text variant="bodyMedium">
    {text}
  </Text>
}