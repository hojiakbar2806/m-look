import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, IProducts } from 'src/app/interface/product';
import { RootState } from '../store';

export interface WishListState {
    wishList: IProducts["products"];
}

const getInitialWishList = (): IProducts["products"] => {
    if (typeof window !== "undefined" && localStorage.getItem("wishList")) {
        try {
            return JSON.parse(localStorage.getItem("wishList")!) || [];
        } catch (e) {
            console.error("Could not parse wish list from localStorage", e);
            return [];
        }
    }
    return [];
};

const initialState: WishListState = {
    wishList: getInitialWishList(),
};

const wishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        addToWishList: (state, action: PayloadAction<IProduct>) => {
            const isExist = state.wishList.find(product => product.id === action.payload.id);
            if (!isExist) {
                state.wishList.push(action.payload);
            } else {
                state.wishList = state.wishList.filter(product => product.id !== action.payload.id);
            }
            localStorage.setItem("wishList", JSON.stringify(state.wishList));
        },
        removeFromWishList: (state, action: PayloadAction<number>) => {
            state.wishList = state.wishList.filter(product => product.id !== action.payload);
            localStorage.setItem("wishList", JSON.stringify(state.wishList));
        },
        clearWishList: (state) => {
            state.wishList = [];
            localStorage.setItem("wishList", JSON.stringify(state.wishList));
        },
    },
});

export const { addToWishList, removeFromWishList, clearWishList } = wishListSlice.actions;
export default wishListSlice.reducer;

export const isProductInWishList = (state: RootState, id: number): boolean => 
    state.wishList.wishList.some(product => product.id === id);
