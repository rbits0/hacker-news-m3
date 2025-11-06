// Item format from https://hn.algolia.com/api/v1/

import Item from './Item';

export default interface AlgoliaItem {
  id: number;
  created_at: string;
  author: string;
  text: string | null;
  points: number;
  parent_id: number | null;
  children: [AlgoliaItem];
  title?: string;
  url?: string;
}

export function algoliaItemToItem(item: AlgoliaItem): Item {
  return {
    id: item.id,
    by: item.author,
    time: Date.parse(item.created_at),
    text: item.text ?? undefined,
    parent: item.parent_id ?? undefined,
    url: item.url,
    score: item.points,
    title: item.title,
    descendants: item.children.length,
  };
}
