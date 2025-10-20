// Item format from https://hn.algolia.com/api/v1/

export default interface AlgoliaItem {
  id: number,
  created_at: string,
  author: string,
  text: string | null,
  points: number,
  parent_id: number | null,
  children: [AlgoliaItem],
  title?: string,
  url?: string,
}