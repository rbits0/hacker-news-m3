import { Surface, Text, useTheme } from "react-native-paper"
import he from "he"
import { useMemo } from "react";
import { ExternalPathString, Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { MD3Theme } from "react-native-paper/lib/typescript/types";
import { DOMParser } from "xmldom"; // Required for native version


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
  // Wrap in <p> since xmldom DOMParser can't handle loose text
  const doc = parser.parseFromString(`<p>${html}</p>`, 'text/html');
  // Must use .documentElement instead of .body for xmldom
  const root = doc.documentElement.childNodes;

  let looseNodes = [];
  let looseDone = false;
  let jsxElements = []; 
  let key = 0;

  // xmldom doesn't have iterator; must use old-fashioned loop
  for (let i = 0; i < root.length; i++) {
    const node = root[i];

    if (
      node.nodeType === Node.TEXT_NODE
      || node.nodeName === 'a'
      || node.nodeName === 'i'
    ) {
      // Handle loose nodes (not wrapped in <p>)
      // Include all text nodes and <a> & <i> elements
      looseNodes.push(node);
      looseDone = false;
    } else {
      if (!looseDone) {
        // Parse the loose nodes
        const looseElement = parseLooseNodes(looseNodes, theme, `${key}`);
        jsxElements.push(looseElement);
        key += 1;

        looseNodes = [];
        looseDone = true;
      }

      jsxElements.push(parseElement(node as Element, theme, `${key}`));
      key += 1;
    }
  }

  if (!looseDone) {
    const looseElement = parseLooseNodes(looseNodes, theme, `${key}`);
    jsxElements.push(looseElement);
    key += 1;
  }

  return jsxElements;
}


function parseElement(
  element: Element,
  theme: MD3Theme,
  key: string
): JSX.Element {
  // xmldom uses lowercase tagName instead of uppercase
  switch (element.tagName) {

    case 'p':
      console.log(element);
      return parseLooseNodes(element.childNodes, theme, key);

    case 'a':
      return (
        <Link
          href={element.getAttribute('href') as ExternalPathString}
          style={[styles.link, { color: theme.colors.primary }]}
          key={key}
        >
          {element.textContent}
        </Link>
      );
    
    case 'i':
      return (
        <Text variant="bodyMedium" style={styles.italicText} key={key}>
          {element.textContent}
        </Text>
      );

    case 'pre':
      if (element.childElementCount === 1 && element.firstElementChild?.tagName === 'code') {
        // Remove extra indentation
        const textContent = element.firstElementChild.textContent || '';
        const text = textContent.split('\n').map(
          line => line.slice(2, line.length)
        ).join('\n');

        return (
          <Surface
            style={[styles.codeBlock, { backgroundColor: theme.colors.elevation.level2 }]}
            key={key}
          >
            <Text variant="bodyMedium" style={styles.codeText}>
              {text}
            </Text>
          </Surface>
        );
      } else {
        console.error('Found <pre> element without child <code> element')

        return (
          <Text variant="bodyMedium" style={[styles.paragraph, styles.error]} key={key}>
            {element.outerHTML}
          </Text>
        );
      }

    default:
      return (
        <Text variant="bodyMedium" style={[styles.paragraph, styles.error]} key={key}>
          {element.outerHTML}
        </Text>
      );
    
  }
}


// Parse list of loose (possibly non-element) nodes (such as children of <p>)
// Returns a single JSX 
function parseLooseNodes(
  nodes: ArrayLike<Node>,
  theme: MD3Theme,
  key: string
): JSX.Element {
  let jsxChildren = [];
  let key2 = 0;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        jsxChildren.push(parseElement(node as Element, theme, `${key}.${key2}`));
        key2 += 1;
        break;
      case Node.TEXT_NODE:
      default:
        // Remove \n, since it should be ignored in HTML
        // Replace it with a space instead

        let textContent = (node.textContent || '')
        // If there's a \n at the start, remove it instead of replacing with space
        // if (jsxChildren.length === 0 && textContent[0] === '\n') {
        //   textContent = textContent.slice(1);
        // }
        textContent = textContent.replaceAll('\n', ' ');

        jsxChildren.push(textContent);
        break;
    }
  }


  return (
    <Text variant="bodyMedium" style={styles.paragraph} key={key}>
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
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
  },
  codeText: {
    fontFamily: 'monospace'
  },
  error: {
    color: 'red'
  },
});