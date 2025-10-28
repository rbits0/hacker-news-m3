import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AccountState {
  isSignedIn: boolean,
  username: string | null,
}

export const accountStateSlice = createSlice({
  name: 'accountState',
  initialState: {
    isSignedIn: false,
    username: null,
  } as AccountState,
  reducers: {

    /** Set isSignedIn to true and set username */
    signIn(state, action: PayloadAction<string | null>) {
      state.isSignedIn = true;
      state.username = action.payload;
    },

    /** Set isSignedIn to false and remove username */
    signOut(state) {
      state.isSignedIn = false;
      state.username = null;
    },

  }
})


export const { signIn, signOut } = accountStateSlice.actions;
export default accountStateSlice.reducer;