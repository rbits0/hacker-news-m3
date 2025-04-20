import { Text, useTheme } from "react-native-paper"
import he from "he"
import { useMemo } from "react";
import { ExternalPathString, Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { MD3Theme } from "react-native-paper/lib/typescript/types";


interface Props {
  text: string,
}

export default function TextBody({ text }: Props) {
  const theme = useTheme();

  const bodyList = useMemo(() => (
    parseHTML(text, theme)
  ), [text, theme]);

  return (
    <View>
      {bodyList}
    </View>
  );
}


// Parses HTML into a list of JSX elements
function parseHTML(html: string, theme: MD3Theme): JSX.Element[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const body = doc.body.childNodes;

  let startText = [];
  let startDone = false;
  let jsxElements = []; 

  for (const node of body.values()) {
    if (
      !startDone
      && (node.nodeType === Node.TEXT_NODE || node.nodeName === 'A' || node.nodeName === 'I')
    ) {
      // Handle start text (which is not wrapped in <p>)
      // Include all text nodes and <a> & <i> elements
      startText.push(node);
    } else {
      if (!startDone) {
        // Not in start anymore
        startDone = true;
      }

      jsxElements.push(parseElement(node as Element, theme));
    }
  }

  const startElement = parsePElement(startText.values(), theme);
  jsxElements.splice(0, 0, startElement);

  return jsxElements;
}


function parseElement(element: Element, theme: MD3Theme): JSX.Element {
  switch (element.tagName) {

    case 'P':
      return parsePElement(element.childNodes.values(), theme);

    case 'A':
      return (
        <Link
          href={element.getAttribute('href') as ExternalPathString}
          style={[styles.link, { color: theme.colors.primary }]}
        >
          {element.textContent}
        </Link>
      );
    
    case 'I':
      return (
        <Text variant="bodyMedium" style={styles.italicText}>
          {element.textContent}
        </Text>
      )

    default:
      return (
        <Text variant="bodyMedium">
          {element.textContent}
        </Text>
      )
    
  }
}


// Parse <p> element
// Takes child nodes as argument instead of the <p> element itself
function parsePElement(children: ArrayIterator<Node>, theme: MD3Theme): JSX.Element {
  let jsxChildren = children.map(node => {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        return parseElement(node as Element, theme);
      case Node.TEXT_NODE:
      default:
        return node.textContent;
    }
  }).toArray();

  return (
    <Text variant="bodyMedium">
      {jsxChildren}
    </Text>
  );
}


const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
  },
  italicText: {
    fontStyle: 'italic',
  },
});