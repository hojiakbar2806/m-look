import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, IProducts } from 'src/interface/product';

const saveToLocalStorage = (state: IProducts["products"]) => {
    localStorage.setItem("wishList", JSON.stringify(state));
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

const initialState: IProducts["products"] = getInitialWishList();

const wishListSlice = createSlice({
    name: 'wishList',
    initialState: initialState,
    reducers: {
        addToWishList: (state, action: PayloadAction<IProduct>) => {
            const isExist = state.some(product => product.id === action.payload.id);
            if (!isExist) {
                state.push(action.payload); 
            } else {
                return state.filter(product => product.id !== action.payload.id); 
            }
            saveToLocalStorage(state);
        },

        removeFromWishList: (state, action: PayloadAction<number>) => {
            state = state.filter(product => product.id !== action.payload);
            saveToLocalStorage(state);
        },

        clearWishList: () => {
            if (typeof window !== "undefined") {
                localStorage.removeItem("wishList");
            }
            return [];
        },
    },
});

export const { addToWishList, removeFromWishList, clearWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
