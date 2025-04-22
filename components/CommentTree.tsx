import Item from "@/store/Item";
import { useGetItemByIdQuery } from "@/store/services/hackerNews";
import Comment from "./Comment";
import { StyleSheet, View } from "react-native";
import { MAX_POST_WIDTH } from "@/app/_layout";


interface Props {
  item?: Item,
  itemId?: number,
}

export default function CommentTree({ item, itemId }: Props) {
  const {
    data: fetchedItem,
    isLoading: itemIsLoading,
    isError: itemIsError,
  } = useGetItemByIdQuery(itemId!, {
    skip: itemId === undefined,
  });

  const itemToRender = fetchedItem ? fetchedItem : item;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>

        <Comment
          item={itemToRender}
          itemIsLoading={itemIsLoading}
          itemIsError={itemIsError}
        />

        <View style={styles.childrenContainer}>
          {itemToRender?.kids?.map((childId) => (
            <CommentTree itemId={childId} key={childId} />
          ))}
        </View>

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  container: {
    gap: 10,
    width: '100%',
    maxWidth: MAX_POST_WIDTH,
  },
  childrenContainer: {
    width: '100%',
    paddingLeft: 25,
  }
})