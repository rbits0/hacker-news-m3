import Story from "@/components/Story";
import { useGetItemByIdQuery } from "@/store/services/hackerNews";
import { useLocalSearchParams } from "expo-router"
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Comment from "@/components/Comment";
import DynamicScrollList from "@/components/DynamicScrollList";


const NUM_COMMENTS_PER_PAGE = 20;


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

      <DynamicScrollList
        data={fetchedItem?.kids}
        renderItem={({ item }) => <Comment itemId={item} />}
        itemsPerPage={NUM_COMMENTS_PER_PAGE}
        contentContainerStyle={styles.innerList}
        style={[styles.list]}
        ListHeaderComponent={
          <View style={styles.storyView}>
            <Story itemId={parseInt(id)} showBody={true} disableCommentsLink={true} />
          </View>
        }
      />

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    width: '100%',
    padding: 6,
  },
  innerList: {
    gap: 10,
  },
  storyView: {
    paddingBottom: 10,
  },
});