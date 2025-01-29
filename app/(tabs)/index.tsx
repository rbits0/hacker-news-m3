import Story from '@/components/Story';
import { RootState } from '@/store';
import Item from '@/store/Item';
import { StoriesType, useGetFrontPageIdsByStoriesTypeQuery, useGetItemByIdQuery } from '@/store/services/hackerNews';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';


export default function Index() {
  const theme = useTheme();
  const {
    data: itemIds,
    error: itemsError,
    isSuccess: itemsQueryIsSuccess,
    isLoading: itemsAreLoading,
  } = useGetFrontPageIdsByStoriesTypeQuery(StoriesType.Top);

  const {
    data: testItem,
    error: testItemError,
    isLoading: testItemIsLoading,
  } = useGetItemByIdQuery(42276865);


  const testItems = [testItem];

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text>aaa {itemsAreLoading ? 'loading' : 'not loading'} {itemsQueryIsSuccess ? 'success' : 'not success'}</Text>
      <Story item={testItem} />
      {itemIds
        ? itemIds.slice(0, 20).map(itemId => (
          <Story itemId={itemId} />
        ))
        : null
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
});