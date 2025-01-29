import Story from '@/components/Story';
import { RootState } from '@/store';
import Item from '@/store/Item';
import { StoriesType, useGetFrontPageIdsByStoriesTypeQuery, useGetItemByIdQuery } from '@/store/services/hackerNews';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, View, ViewToken } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';


const NUM_STORIES_PER_PAGE = 20;


export default function Index() {
  const theme = useTheme();
  const {
    data: itemIds,
    error: itemsError,
    isSuccess: itemsQueryIsSuccess,
    isLoading: itemsAreLoading,
  } = useGetFrontPageIdsByStoriesTypeQuery(StoriesType.Top);

  // Only load a certain number of stories at a time
  const [numStories, setNumStories] = useState(NUM_STORIES_PER_PAGE);
  const itemIdsToRender = itemIds?.slice(0, numStories);


  // useCallback with empty dependency list, since FlatList doesn't like functions changing
  const onViewableItemsChanged = useCallback(({ changed, viewableItems }: {
    changed: ViewToken<number>[],
    viewableItems: ViewToken<number>[],
  }) => {
    // Since we're in a useCallback, we don't have access to the current numStories
    // Run the code inside the setNumStories callback instead, so we have the current numStories
    setNumStories(numStories => {
      let maxIndex = Math.max(...viewableItems.map(viewToken => viewToken.index!));

      // If less than a page away, load new stories
      if (maxIndex > numStories - NUM_STORIES_PER_PAGE) {
        return numStories + NUM_STORIES_PER_PAGE;
      } else {
        return numStories;
      }
    });
  }, []);


  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FlatList
        data={itemIdsToRender}
        renderItem={({ item }) => <Story itemId={item} />}
        onViewableItemsChanged={onViewableItemsChanged}
        contentContainerStyle={styles.innerList}
        style={styles.list}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 6,
  },
  list: {
    width: '100%',
  },
  innerList: {
    gap: 10,
  },
});