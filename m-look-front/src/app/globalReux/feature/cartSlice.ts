import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartProduct, IProduct } from 'src/app/interface/product';


interface CartProducts {
    products: ICartProduct[];
    totalPrice: number;
    dialogState: 'open' | 'close'; 
}

const getInitialCartItems = (): CartProducts => {
    if (typeof window !== "undefined" && localStorage.getItem("cartList")) {
        try {
            return JSON.parse(localStorage.getItem("cartList")!) || {
                products: [],
                totalPrice: 0,
                isDialogOpen: "close", 
            };
        } catch (e) {
            console.error("Could not parse wish list from localStorage", e);
            return {
                products: [],
                totalPrice: 0,
                dialogState: 'close',
            };
        }
    }
    return {
        products: [],
        totalPrice: 0,
        dialogState: 'close',
    };
};

const initialState: CartProducts = getInitialCartItems();

const cartListSlice = createSlice({
    name: 'cartList',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProduct>) => {
            const existingProduct = state.products.find(product => product.id === action.payload.id);
            if (!existingProduct) {
                const newProduct: ICartProduct = {
                    ...action.payload,
                    quantity: 1,
                    totalPrice: action.payload.price,
                };
                state.products.push(newProduct);
            } else {
                existingProduct.quantity += 1;
                existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
            }
            state.totalPrice = state.products.reduce((total, product) => total + product.totalPrice, 0);
            localStorage.setItem("cartList", JSON.stringify(state));
        },

        increment: (state, action: PayloadAction<number>) => {
            const existingProduct = state.products.find(product => product.id === action.payload);
            if (existingProduct) {
                existingProduct.quantity += 1;
                existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
            }
            state.totalPrice = state.products.reduce((total, product) => total + product.totalPrice, 0);
            localStorage.setItem("cartList", JSON.stringify(state));
        },

        decrement: (state, action: PayloadAction<number>) => {
            const existingProduct = state.products.find(product => product.id === action.payload);
            if (existingProduct) {
                if (existingProduct.quantity > 1) {
                    existingProduct.quantity -= 1;
                    existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
                } else {
                    state.products = state.products.filter(product => product.id !== action.payload);
                }
            }
            state.totalPrice = state.products.reduce((total, product) => total + product.totalPrice, 0);
            localStorage.setItem("cartList", JSON.stringify(state));
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
            localStorage.setItem("cartList", JSON.stringify(state));
        },

        clearCart: (state) => {
            state.products = [];
            localStorage.removeItem("cartList");
        },

        closeCartDialog: (state) => {
            if (state.dialogState === 'open' && typeof window !== "undefined") {
                state.dialogState = 'close';
            }
        },

        openCartDialog: (state) => {
            if (state.dialogState === 'close' && typeof window !== "undefined") {
                state.dialogState = 'open';
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, increment, decrement, closeCartDialog, openCartDialog } = cartListSlice.actions;
export default cartListSlice.reducer;
