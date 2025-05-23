import Story from "@/components/Story";
import { useGetItemByIdQuery } from "@/store/services/hackerNews";
import { useLocalSearchParams } from "expo-router"
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import DynamicScrollList from "@/components/DynamicScrollList";
import { LARGE_WIDTH } from "@/app/_layout";
import CommentTree from "@/components/CommentTree";


const NUM_COMMENTS_PER_PAGE = 20;


export default function CommentsScreen() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
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
        renderItem={({ item }) => <CommentTree itemId={item} />}
        itemsPerPage={NUM_COMMENTS_PER_PAGE}
        contentContainerStyle={styles.innerList}
        style={[styles.list, { padding: width < LARGE_WIDTH ? 6 : 12 }]}
        ListHeaderComponent={
          <View>
            <Story itemId={parseInt(id)} showBody={true} disableCommentsLink={true} />
            <Divider style={styles.divider} />
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
  divider: {
    marginTop: 8,
    marginBottom: -2 // Combined with gap of 10 makes this 8
  },
});