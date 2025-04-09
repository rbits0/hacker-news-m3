import Item from '@/store/Item';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ExternalPathString, Link, Route } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Surface, Text, useTheme } from 'react-native-paper';
import OptionalLink from './OptionalLink';
import { useGetItemByIdQuery } from '@/store/services/hackerNews';


interface Props {
  item?: Item,
  itemId?: number,
}

export default function Story({ item, itemId }: Props) {
  const theme = useTheme();

  const {
    data: fetchedItem,
    isLoading: itemIsLoading,
    isError: itemIsError,
  } = useGetItemByIdQuery(itemId!, {
    skip: itemId === undefined,
  });

  const itemToRender = fetchedItem ? fetchedItem : item;
  const itemUrl = itemToRender
    ? `/comments/${itemToRender.id}` as Route
    : undefined;
  const userUrl = itemToRender
    ? `https://news.ycombinator.com/user?id=${itemToRender.by}` as Route
    : undefined;

  
  return (
    <View style={styles.container}>

      <View>
        <IconButton
          mode="contained"
          size={22}
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="arrow-up-bold-outline" size={30} color={color} style={{ marginTop: -1 }}/>
          )}
          onPress={() => {}}
          style={styles.voteButton}
          disabled={itemToRender === undefined}
        />
        <Text variant="bodyLarge" style={styles.scoreText}>{itemToRender?.score}</Text>
      </View>
    
      <Surface style={[styles.surface]}>
        <View style={[styles.surfaceRow]}>
          {itemToRender ? (
            <Surface elevation={3} style={styles.imageContainer} mode="flat">
              <OptionalLink href={itemToRender?.url as ExternalPathString | undefined} enabled={true}>
                <MaterialCommunityIcons name="link" color={theme.colors.primary} size={31} />
              </OptionalLink>
            </Surface>
          ) : null}

          {itemToRender ? (
            <Link style={styles.titleLink} href={itemUrl!}>
              <Text variant="bodyLarge" >{itemToRender.title}</Text>
            </Link>
          ) : (
            <View style={styles.noItemView}>
              <Text variant="bodyLarge">
                {itemIsLoading ? 'Loading...' : 'Failed to load'}
              </Text>
            </View>
          )}
        </View>
      
        <View style={styles.detailsRow}>
          <OptionalLink href={itemUrl}>
            <Text variant="bodyMedium" style={[styles.detailsText, { color: theme.colors.onSurfaceVariant }]}>
              {itemToRender ? `${itemToRender.descendants} comments` : ' '}
            </Text>
          </OptionalLink>

          <OptionalLink href={userUrl}>
            <Text variant="bodyMedium" style={[styles.detailsText, { color: theme.colors.onSurfaceVariant }]}>
              {itemToRender ? itemToRender.by : ' '}
            </Text>
          </OptionalLink>
        </View>

      </Surface>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
    gap: 6,
  },
  surface: {
    padding: 4,
    borderRadius: 10,
    flex: 1,
  },
  surfaceRow: {
    flexDirection: 'row',
    gap: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  voteButton: {
    margin: 0,
    marginTop: 8,
  },
  imageContainer: {
    width: 44,
    height: 44,
    margin: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noItemView: {
    marginLeft: 4
  },
  titleLink: {
    flex: 1,
  },
  scoreText: {
    textAlign: "center",
    marginTop: 4,
  },
  detailsText: {
    margin: 4,
  },
});