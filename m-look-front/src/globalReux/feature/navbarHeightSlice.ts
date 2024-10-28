import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavbarHeightState {
  headerItemsHeight: number;
  navbarHeight: number;
}

const initialState: NavbarHeightState = {
  headerItemsHeight: 0,
  navbarHeight: 0,

};

const navbarHeightSlice = createSlice({
  name: 'navbarHeight',
  initialState,
  reducers: {
    setNavbarHeight: (state, action: PayloadAction<number>) => {
      state.navbarHeight = action.payload;
    },
    setHeaderItemsHeight: (state, action: PayloadAction<number>) => {
      state.headerItemsHeight = action.payload; 
    }
  },
});

export const { setNavbarHeight, setHeaderItemsHeight } = navbarHeightSlice.actions;
export default navbarHeightSlice.reducer;
