import { createSlice } from '@reduxjs/toolkit';
import Item from '@/store/Item';


export enum StoriesType {
  New,
  Top,
  Best,
}


interface FrontPageState {
  items: Item[],
  storiesType: StoriesType,
}

const initialState: FrontPageState = {
  items: [
    {
      id: 1,
      type: 'story',
      by: 'a',
      time: 1,
      title: 'Woah',
      url: 'https://www.ycombinator.com',
    }
  ],
  storiesType: StoriesType.Top,
};


export const frontPageSlice = createSlice({
  name: 'frontPage',
  initialState,
  reducers: {},
})


export default frontPageSlice.reducer;