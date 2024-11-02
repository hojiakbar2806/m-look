import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavbarState {
  isTop: boolean;
}

const initialState: NavbarState = {
  isTop: true,
};

const navbarHeightSlice = createSlice({
  name: 'navbarHeight',
  initialState,
  reducers: {
    setNavbarState: (state, action: PayloadAction<boolean>) => {
      state.isTop = action.payload;
    }

  },
});

export const { setNavbarState } = navbarHeightSlice.actions;
export default navbarHeightSlice.reducer;
