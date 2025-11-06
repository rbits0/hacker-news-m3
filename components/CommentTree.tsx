import Comment from './Comment';
import { StyleSheet, View } from 'react-native';
import { MAX_POST_WIDTH } from '@/app/_layout';
import TreeLine from './TreeLine';
import AlgoliaItem, { algoliaItemToItem } from '@/store/AlgoliaItem';

interface Props {
  item: AlgoliaItem;
  itemId?: number;
}

export default function CommentTree({ item, itemId }: Props) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Comment item={algoliaItemToItem(item)} />

        {item.children.length > 0 ?
          <View style={styles.indentContainer}>
            <TreeLine />
            <View style={styles.childrenContainer}>
              {item.children.map((child) => (
                <CommentTree item={child} key={child.id} />
              ))}
            </View>
          </View>
        : null}
      </View>
    </View>
  );
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
  },
});
