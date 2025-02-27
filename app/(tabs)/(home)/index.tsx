import Story from '@/components/Story';
import { StoriesType, useGetFrontPageIdsByStoriesTypeQuery } from '@/store/services/hackerNews';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View, ViewToken } from 'react-native';
import { useTheme } from 'react-native-paper';
import { LARGE_WIDTH } from '@/app/_layout';


const NUM_STORIES_PER_PAGE = 20;


export default function Index() {
  const theme = useTheme();
  const {
    data: itemIds,
    error: itemsError,
    isSuccess: itemsQueryIsSuccess,
    isLoading: itemsAreLoading,
  } = useGetFrontPageIdsByStoriesTypeQuery(StoriesType.Top);
  const { width } = useWindowDimensions();

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
        style={[styles.list, { padding: width < LARGE_WIDTH ? 6 : 12 }]}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
  innerList: {
    gap: 10,
  },
});