import {  Text, useTheme } from "react-native-paper"
import { useMemo } from "react";
import { ExternalPathString } from "expo-router";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { DOMParser } from "xmldom"; // Required for native version
import CodeBlock from "./CodeBlock";
import TextLink from "./TextLink";


const INLINE_ELEMENTS = ['a', 'i'];

enum NodeType {
  ELEMENT = 1,
  TEXT = 3,
}

interface Props {
  text: string,
  style?: StyleProp<ViewStyle>,
}

export default function TextBody({ text, style }: Props) {
  const bodyList = useMemo(() => (
    parseHTML(text)
  ), [text]);

  return (
    <View style={[styles.container, style]}>
      {bodyList}
    </View>
  );
}


// Parses HTML into a list of JSX elements
function parseHTML(html: string): (JSX.Element | null)[] {
  // xmldom treats the <p> tags as opening a new nested element instead of a line break
  const htmlToParse = html.replaceAll('<p>', '<br>');

  const parser = new DOMParser();
  // Wrap in <p> since xmldom DOMParser can't handle loose text
  const doc = parser.parseFromString(`<p>${htmlToParse}</p>`, 'text/html');
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
      node.nodeType === NodeType.TEXT
      || INLINE_ELEMENTS.includes(node.nodeName)
    ) {
      // Handle loose nodes (not wrapped in <p>)
      // Include all text nodes and inline elements
      looseNodes.push(node);
      looseDone = false;
    } else {
      if (!looseDone) {
        // Parse the loose nodes
        const looseElement = parseLooseNodes(looseNodes, `${key}`);
        jsxElements.push(looseElement);
        key += 1;

        looseNodes = [];
        looseDone = true;
      }

      jsxElements.push(parseElement(node as Element, `${key}`));
      key += 1;
    }
  }

  if (!looseDone) {
    const looseElement = parseLooseNodes(looseNodes, `${key}`);
    jsxElements.push(looseElement);
    key += 1;
  }

  return jsxElements;
}


function parseElement(
  element: Element,
  key: string
): JSX.Element | null {
  // xmldom uses lowercase tagName instead of uppercase
  switch (element.tagName) {

    case 'br':
      return null;

    case 'a':
      return (
        <TextLink
          href={element.getAttribute('href') as ExternalPathString}
          key={key}
        >
          {element.textContent}
        </TextLink>
      );
    
    case 'i':
      return (
        <Text variant="bodyMedium" style={styles.italicText} key={key}>
          {element.textContent}
        </Text>
      );

    case 'pre':
      if (element.firstChild?.nodeName === 'code') {
        // Remove extra indentation
        const textContent = element.firstChild.textContent || '';
        const text = textContent.split('\n').map(
          line => line.slice(2, line.length)
        ).join('\n');

        return (
          <CodeBlock key={key}>
            {text}
          </CodeBlock>
        );
      } else {
        console.error('Found <pre> element without child <code> element')

        return (
          <Text variant="bodyMedium" style={styles.error} key={key}>
            {element.outerHTML}
          </Text>
        );
      }

    default:
      return (
        <Text variant="bodyMedium" style={styles.error} key={key}>
          {element.outerHTML}
        </Text>
      );
    
  }
}


// Parse list of loose (possibly non-element) nodes
// Returns a single JSX component
function parseLooseNodes(
  nodes: ArrayLike<Node>,
  key: string
): JSX.Element {
  let jsxChildren = [];
  let key2 = 0;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    switch (node.nodeType) {
      case NodeType.ELEMENT:
        jsxChildren.push(parseElement(node as Element, `${key}.${key2}`));
        key2 += 1;
        break;
      case NodeType.TEXT:
      default:
        // Remove \n, since it should be ignored in HTML
        // Replace it with a space instead

        let textContent = (node.textContent || '')
        // If there's a \n at the start, remove it instead of replacing with space
        if (jsxChildren.length === 0 && textContent[0] === '\n') {
          textContent = textContent.slice(1);
        }
        textContent = textContent.replaceAll('\n', ' ');

        jsxChildren.push(textContent);
        break;
    }
  }


  return (
    <Text variant="bodyMedium" key={key}>
      {jsxChildren}
    </Text>
  );
}


const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  italicText: {
    fontStyle: 'italic',
  },
  error: {
    color: 'red'
  },
});