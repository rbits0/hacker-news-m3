import Item from '@/store/Item';
import { Route } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import OptionalLink from './OptionalLink';
import TextBody from './TextBody';
import VoteButtonLarge from './VoteButtonLarge';
import { useAppSelector } from '@/store/hooks';


interface Props {
  item: Item | undefined,
  itemIsLoading?: boolean,
  itemIsError?: boolean,
}

export default function Comment({ item, itemIsLoading, itemIsError }: Props) {
  // WIP

  const theme = useTheme();
  
  const displayVotes = useAppSelector(state => state.settings.settings.displayVotes);
  const largeVoteButton = useAppSelector(state => state.settings.settings.commentsLargeVoteButton);

  const itemUrl = item
    ? `/comments/${item.id}` as Route
    : undefined;
  const userUrl = item
    ? `https://news.ycombinator.com/user?id=${item.by}` as Route
    : undefined;

  const text = itemIsLoading ? 'Loading...'
    : itemIsError ? 'Comment failed to load'
    : item?.deleted ? '[deleted]'
    : item!.text || '';

  
  return (
    <View style={styles.container}>

      {displayVotes && largeVoteButton ? (
        <VoteButtonLarge
          disabled={item == undefined}
          score={item?.score}
          onPress={() => { /* TODO: Vote */ }}
        />
      ) : null}
    
      <Surface style={[styles.surface]}>

        <View style={styles.detailsRow}>
          <OptionalLink href={userUrl}>
            <Text variant="bodyMedium" style={[styles.detailsText, { color: theme.colors.secondary }]}>
              {item ? item.by : ''}
            </Text>
          </OptionalLink>
        </View>

        <View style={styles.textBodyView}>
          <TextBody text={text} />
        </View>

      </Surface>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
    marginLeft: 6,
    marginTop: 4,
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
    marginLeft: 4,
  },
  detailsText: {
  },
  textBodyView: {
    margin: 6,
  },
});