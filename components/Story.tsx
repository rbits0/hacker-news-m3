import Item from '@/store/Item';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ExternalPathString, Link, Route } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text as TextRN } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import OptionalLink from './OptionalLink';
import { useGetItemByIdQuery } from '@/store/services/hackerNews';
import TextBody from './TextBody';
import VoteButtonLarge from './VoteButtonLarge';
import { useAppSelector } from '@/store/hooks';
import LinkImage from './LinkImage';


interface Props {
  item?: Item,
  itemId?: number,
  showBody?: boolean,
  disableCommentsLink?: boolean,
}

export default function Story({ item, itemId, showBody, disableCommentsLink }: Props) {
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
  const articleUrl = itemToRender?.url as ExternalPathString | undefined;

  
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
        <View style={[styles.surfaceRow]}>
          <LinkImage href={articleUrl}/>

          {/* Title */}
          <OptionalLink
            href={itemUrl!}
            enabled={itemToRender && !disableCommentsLink}
            style={styles.titleLink}
          >
            <Text variant="bodyLarge" style={styles.titleText} >{
              itemToRender
                ? itemToRender.title
                : itemIsLoading
                  ? 'Loading'
                  : 'Failed to load'
              }</Text>
          </OptionalLink>
        </View>

        {showBody && itemToRender?.text ? (
          <View style={styles.textBodyView}>
            <TextBody text={itemToRender.text} />
          </View>
        ) : null}
      
        <View style={styles.detailsRow}>
          <OptionalLink href={itemUrl} enabled={!disableCommentsLink}>
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
    gap: 8,
    margin: 4,
  },
  noItemView: {
    marginLeft: 4
  },
  detailsText: {
  },
  textBodyView: {
    margin: 6,
  },
  titleText: {
    flexShrink: 1,
  },
  titleLink: {
    flex: 1,
  },
});