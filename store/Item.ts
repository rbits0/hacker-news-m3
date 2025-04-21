export default interface Item {
  id: number,
  type: 'story' | 'comment',
  by: string,
  time: number,
  text?: string,
  parent?: number,
  kids?: number[],
  url?: string,
  score?: number,
  title?: string,
  descendants?: number,
  deleted?: boolean,
}
