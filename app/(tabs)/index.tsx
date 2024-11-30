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

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>
      <Button
        mode="contained"
        onPress={() => {}}
        labelStyle={styles.buttonText}
      >
        Hello
      </Button>
      <Story item={item} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 24,
  },
});