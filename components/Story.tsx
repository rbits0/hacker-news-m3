import Item from '@/store/Item';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ExternalPathString, Link } from 'expo-router';
import React from 'react';
import { NativeSyntheticEvent, PixelRatio, StyleSheet, TextLayoutEventData, View } from 'react-native';
import { IconButton, Surface, Text, useTheme } from 'react-native-paper';
import OptionalLink from './OptionalLink';
import { useGetItemByIdQuery } from '@/store/services/hackerNews';


interface Props {
  item?: Item,
  itemId?: number,
}

export default function Story({ item, itemId }: Props) {
  const theme = useTheme();
  let fontScale = PixelRatio.getFontScale();

  const {
    data: fetchedItem,
    isLoading: itemIsLoading,
    isError: itemIsError,
  } = useGetItemByIdQuery(itemId!, {
    skip: itemId === undefined,
  });

  const itemToRender = fetchedItem ? fetchedItem : item;

  
  const height = fontScale * (
      theme.fonts.bodyLarge.lineHeight + theme.fonts.bodyMedium.lineHeight
    ) + 6;

  return (
    <View style={styles.container}>
      <IconButton
        mode="contained"
        size={22}
        icon={({ size, color }) => (
          <MaterialCommunityIcons name="arrow-up-bold-outline" size={30} color={color} style={{ marginTop: -1 }}/>
        )}
        onPress={() => {}}
        disabled={itemToRender === undefined}
      />
    
      <Surface style={[styles.surface]}>
        <Surface elevation={3} style={styles.imageContainer} mode="flat">
          <OptionalLink href={itemToRender?.url as ExternalPathString | undefined} enabled={true}>
            <MaterialCommunityIcons name="link" color={theme.colors.primary} size={height - 25} />
          </OptionalLink>
        </Surface>

        {itemToRender ? (
          <Link href={`https://news.ycombinator.com/item?id=${itemToRender.id}`}>
            <View>
              <Text variant="bodyLarge">{itemToRender.title}</Text>
              <Text variant="bodyMedium">{itemToRender.descendants} comments</Text>
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
  },
  surface: {
    padding: 4,
    borderRadius: 10,
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  button: {
  },
  imageContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});