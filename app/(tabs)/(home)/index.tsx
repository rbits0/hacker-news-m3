import Story from '@/components/Story';
import { StoriesType, useGetFrontPageIdsByStoriesTypeQuery } from '@/store/services/hackerNews';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View, ViewToken } from 'react-native';
import { useTheme } from 'react-native-paper';
import { LARGE_WIDTH } from '@/app/_layout';
import DynamicScrollList from '@/components/DynamicScrollList';


// Number of stories to load at a time.
// A "page" refers to a batch of stories being loaded
const NUM_STORIES_PER_PAGE = 20;


export default function Index() {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const {
    data: itemIds,
    error: itemsError,
    isSuccess: itemsQueryIsSuccess,
    isLoading: itemsAreLoading,
  } = useGetFrontPageIdsByStoriesTypeQuery(StoriesType.Top);


  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DynamicScrollList
        data={itemIds}
        renderItem={({ item }) => <Story itemId={item} />}
        itemsPerPage={NUM_STORIES_PER_PAGE}
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