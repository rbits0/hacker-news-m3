import Story from "@/components/Story";
import { useGetItemByIdQuery } from "@/store/services/hackerNews";
import { useLocalSearchParams } from "expo-router"
import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";


export default function CommentsScreen() {
  const theme = useTheme();
  const { id }: { id: string } = useLocalSearchParams();
  const {
    data: fetchedItem,
    isLoading: itemIsLoading,
    isError: itemIsError,
  } = useGetItemByIdQuery(parseInt(id));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Story itemId={parseInt(id)} showBody={true} disableCommentsLink={true} />
      <Text>{fetchedItem?.kids?.map(id => `${id}, `)}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
});