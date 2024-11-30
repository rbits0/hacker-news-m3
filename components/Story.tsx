import Item from '@/store/Item';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ExternalPathString, Link } from 'expo-router';
import React from 'react';
import { NativeSyntheticEvent, PixelRatio, StyleSheet, TextLayoutEventData, View } from 'react-native';
import { IconButton, Surface, Text, useTheme } from 'react-native-paper';
import OptionalLink from './OptionalLink';


interface Props {
  item: Item | undefined,
}

export default function Story({ item }: Props) {
  const theme = useTheme();
  let fontScale = PixelRatio.getFontScale();
  
  const height = fontScale * (
      theme.fonts.bodyLarge.lineHeight + theme.fonts.bodyMedium.lineHeight
    ) + 10;

  return (
    <View style={styles.container}>
      <IconButton
        mode="contained"
        size={22}
        icon={({ size, color }) => (
          <MaterialCommunityIcons name="arrow-up-bold-outline" size={30} color={color} style={{ marginTop: -1 }}/>
        )}
        onPress={() => {}}
        disabled={item === undefined}
      />
    
        <Surface style={[styles.surface, { height }]}>
          <Surface elevation={3} style={styles.imageContainer} mode="flat">
            <OptionalLink href={item?.url as ExternalPathString | undefined} enabled={true}>
              <MaterialCommunityIcons name="link" color={theme.colors.primary} size={height - 35} />
            </OptionalLink>
          </Surface>

          {item ? (
            <Link href={`https://news.ycombinator.com/item?id=${item.id}`}>
              <View>
                <Text variant="bodyLarge" onTextLayout={onTextLayout}>{item.title}</Text>
                <Text variant="bodyMedium">{item.descendants} comments</Text>
              </View>
            </Link>
          ) : (
            <Text variant="bodyLarge">Failed to load item</Text>
          )}
        </Surface>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  surface: {
    padding: 15,
    borderRadius: 10,
    width: '100%',
    gap: 4,
  },
  button: {
  },
});