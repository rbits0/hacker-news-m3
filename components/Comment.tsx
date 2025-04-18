import Item from '@/store/Item';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ExternalPathString, Link, Route } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import OptionalLink from './OptionalLink';
import { useGetItemByIdQuery } from '@/store/services/hackerNews';
import TextBody from './TextBody';
import VoteButtonLarge from './VoteButtonLarge';
import { useAppSelector } from '@/store/hooks';


interface Props {
  item?: Item,
  itemId?: number,
}

export default function Comment({ item, itemId }: Props) {
  // WIP

  const theme = useTheme();
  
  const displayVotes = useAppSelector(state => state.settings.settings.displayVotes);

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

      {displayVotes ? (
        <VoteButtonLarge
          disabled={itemToRender == undefined}
          score={itemToRender?.score}
          onPress={() => { /* TODO: Vote */ }}
        />
      ) : null}
    
      <Surface style={[styles.surface]}>
        <View style={styles.textBodyView}>
          <TextBody text={itemToRender?.text || ''} />
        </View>

        <View style={styles.detailsRow}>
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
  detailsRow: {
    flexDirection: 'row',
    gap: 8,
    margin: 4,
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
  detailsText: {
  },
  textBodyView: {
    margin: 6,
  },
});