import Story from '@/components/Story';
import { RootState } from '@/store';
import { useGetItemByIdQuery } from '@/store/services/hackerNews';
import { StyleSheet, View } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';


export default function Index() {
  const theme = useTheme();
  const items = useSelector((state: RootState) => state.frontPage.items);
  const {
    data: item,
    error: itemError,
    isLoading: itemIsLoading,
  } = useGetItemByIdQuery(42276865);
  const testItems = [item];

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {testItems.map(item => (
        <Story item={item} />
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
});