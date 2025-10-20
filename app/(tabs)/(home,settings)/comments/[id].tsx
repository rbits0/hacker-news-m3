import Story from "@/components/Story";
import { useLocalSearchParams } from "expo-router"
import { View, StyleSheet, useWindowDimensions, FlatList } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import { LARGE_WIDTH } from "@/app/_layout";
import CommentTree from "@/components/CommentTree";
import { useGetAlgoliaItemByIdQuery } from "@/store/services/algolia";
import { algoliaItemToItem } from "@/store/AlgoliaItem";


const NUM_COMMENTS_PER_PAGE = 20;


export default function CommentsScreen() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const { id }: { id: string } = useLocalSearchParams();

  const {
    data: item,
    isLoading,
    isError,
  } = useGetAlgoliaItemByIdQuery(parseInt(id));


  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

      <FlatList
        data={item?.children}
        renderItem={({ item }) => <CommentTree item={item} />}
        contentContainerStyle={styles.innerList}
        style={[styles.list, { padding: width < LARGE_WIDTH ? 6 : 12 }]}
        ListHeaderComponent={
          <View>
            <Story
              item={item ? algoliaItemToItem(item) : undefined}
              itemIsLoading={isLoading}
              itemIsError={isError}
              showBody={true}
              disableCommentsLink={true}
            />
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