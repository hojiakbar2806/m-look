import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth, IUser } from "src/types/user";

const initialState: IAuth = {
  access_token: null,
  is_logged_in: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
      state.is_logged_in = true;
    },
    setAuthUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.is_logged_in = false;
      state.access_token = null;
      state.user = null;
    },
    setAuth: (state) => {
      state.is_logged_in = true;
    },
  },
});

export const { setToken, setAuthUser, setLogout, setAuth } = authSlice.actions;
export default authSlice.reducer;
