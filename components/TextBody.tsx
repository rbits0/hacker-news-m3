import { Text } from "react-native-paper"
import he from "he"
import { useMemo } from "react";


interface Props {
  text: string,
}

export default function TextBody({ text }: Props) {
  const formattedText = useMemo(() => (
    formatText(text)
  ), [text]);

  return <Text variant="bodyMedium">
    {formattedText}
  </Text>
}


function formatText(text: string): string {
  // Decode HTML characters
  let formattedText = he.decode(text);

  // TODO: Handle escapes?
  // TODO: Make gap smaller
  formattedText = formattedText.replaceAll('<p>', '\n\n');
  
  return formattedText;
}