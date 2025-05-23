import Item from "@/store/Item";
import { useGetItemByIdQuery } from "@/store/services/hackerNews";
import Comment from "./Comment";
import { StyleSheet, View } from "react-native";
import { MAX_POST_WIDTH } from "@/app/_layout";
import TreeLine from "./TreeLine";


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

        {itemToRender?.kids && itemToRender.kids.length > 0 ? (
          <View style={styles.indentContainer}>
            <TreeLine />
            <View style={styles.childrenContainer}>
              {itemToRender?.kids?.map((childId) => (
                <CommentTree itemId={childId} key={childId} />
              ))}
            </View>
          </View>
        ) : null}

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
  },
  container: {
    gap: 10,
    width: '100%',
    maxWidth: MAX_POST_WIDTH,
  },
  indentContainer: {
    flexDirection: 'row',
  },
  childrenContainer: {
    gap: 10,
    flex: 1,
  }
})