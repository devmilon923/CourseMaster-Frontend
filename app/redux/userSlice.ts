import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IUser = null | {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  image: string;
  isVerified: boolean;
};
export type TInitialState = {
  user: IUser;
  token: null | string;
};
const initialState: TInitialState = {
  user: null,
  token: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("auth");
      localStorage.removeItem("aauth");
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, setUser, logout } = userSlice.actions;
export default userSlice.reducer;
