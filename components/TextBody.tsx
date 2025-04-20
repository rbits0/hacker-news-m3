import { Surface, Text, useTheme } from "react-native-paper"
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

  let looseNodes = [];
  let looseDone = false;
  let jsxElements = []; 

  for (const node of body.values()) {
    if (
      node.nodeType === Node.TEXT_NODE
      || node.nodeName === 'A'
      || node.nodeName === 'I'
    ) {
      // Handle loose nodes (not wrapped in <p>)
      // Include all text nodes and <a> & <i> elements
      looseNodes.push(node);
      looseDone = false;
    } else {
      if (!looseDone) {
        // Parse the loose nodes
        const looseElement = parsePElement(looseNodes.values(), theme);
        jsxElements.push(looseElement);

        looseNodes = [];
        looseDone = true;
      }

      jsxElements.push(parseElement(node as Element, theme));
    }
  }

  if (!looseDone) {
    const looseElement = parsePElement(looseNodes.values(), theme);
    jsxElements.push(looseElement);
  }

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
      );

    case 'PRE':
      if (element.childElementCount === 1 && element.firstElementChild?.tagName === 'CODE') {
        // Remove extra indentation
        const textContent = element.firstElementChild.textContent || '';
        const text = textContent.split('\n').map(
          line => line.slice(2, line.length)
        ).join('\n');

        return (
          <Surface style={[styles.codeBlock, { backgroundColor: theme.colors.elevation.level2 }]}>
            <Text variant="bodyMedium" style={styles.codeText}>
              {text}
            </Text>
          </Surface>
        );
      } else {
        console.error('Found <pre> element without child <code> element')

        return (
          <Text variant="bodyMedium" style={[styles.paragraph, styles.error]}>
            {element.outerHTML}
          </Text>
        );
      }

    default:
      return (
        <Text variant="bodyMedium" style={[styles.paragraph, styles.error]}>
          {element.outerHTML}
        </Text>
      );
    
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
        // Remove \n, since it should be ignored in HTML
        // Replace it with a space instead (unless it's at the start where it is just removed)
        let textContent = (node.textContent || '')
        if (textContent[0] === '\n') {
          textContent = textContent.slice(1);
        }
        textContent = textContent.replaceAll('\n', ' ');

        return textContent;
    }
  }).toArray();


  return (
    <Text variant="bodyMedium" style={styles.paragraph}>
      {jsxChildren}
    </Text>
  );
}


const styles = StyleSheet.create({
  paragraph: {
    marginTop: 4,
    marginBottom: 4,
  },
  link: {
    textDecorationLine: 'underline',
  },
  italicText: {
    fontStyle: 'italic',
  },
  codeBlock: {
    borderRadius: 8,
    padding: 4,
  },
  codeText: {
    fontFamily: 'monospace'
  },
  error: {
    color: 'red'
  },
});