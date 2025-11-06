// Item format from https://hacker-news.firebaseio.com/v0/item/

export default interface Item {
  id: number;
  by: string;
  time: number;
  type?: 'story' | 'comment';
  text?: string;
  parent?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  descendants?: number;
  deleted?: boolean;
}
