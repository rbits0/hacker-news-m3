// List that loads more items as you scroll
// Uses React Native FlatList

import React, { useCallback, useState } from "react"
import { FlatList, ListRenderItem, StyleProp, ViewStyle, ViewToken } from "react-native"


interface DynamicScrollListProps<ItemT> {
  data: ItemT[] | null | undefined,
  renderItem: ListRenderItem<ItemT>,
  itemsPerPage: number,
  contentContainerStyle?: StyleProp<ViewStyle>,
  style: StyleProp<ViewStyle>,
}

export default function DynamicScrollList<ItemT>({
  data,
  renderItem,
  itemsPerPage,
  contentContainerStyle,
  style,
}: DynamicScrollListProps<ItemT>) {
  // Only load a certain number of items initially
  const [numItems, setNumItems] = useState(itemsPerPage);
  const itemsToRender = data?.slice(0, numItems);

  // Load new items on scroll
  // useCallback with empty dependency list, since FlatList doesn't like functions changing
  const onViewableItemsChanged = useCallback(({ changed, viewableItems }: {
    changed: ViewToken<ItemT>[],
    viewableItems: ViewToken<ItemT>[],
  }) => {
    // Since we're in a useCallback, we don't have access to the current numItems
    // Run the code inside the setNumItems callback instead, so we have the current numItems
    setNumItems(numItems => {
      let maxIndex = Math.max(...viewableItems.map(viewToken => viewToken.index!));

      // If less than a page away, load new stories
      if (maxIndex > numItems - itemsPerPage) {
        return numItems + itemsPerPage;
      } else {
        return numItems;
      }
    });
  }, []);


  return (
    <FlatList
      data={itemsToRender}
      renderItem={renderItem}
      onViewableItemsChanged={onViewableItemsChanged}
      contentContainerStyle={contentContainerStyle}
      style={style}
    />
  )
}