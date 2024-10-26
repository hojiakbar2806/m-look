import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from 'src/app/interface/product';

interface CartProduct extends IProduct {
    quantity: number;
    totalPrice: number;
}

interface CartProducts  {
    products: CartProduct[];
    totalPrice: number;
}


const getInitialCartItems = (): CartProducts => {
    if (typeof window !== "undefined" && localStorage.getItem("cartList")) {
        try {
            return JSON.parse(localStorage.getItem("cartList")!) || {
                products: [],
                totalPrice: 0,
            };
        } catch (e) {
            console.error("Could not parse wish list from localStorage", e);
            return {
                products: [],
                totalPrice: 0,
            };
        }
    }
    return {
        products: [],
        totalPrice: 0,
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
                const newProduct: CartProduct = {
                    ...action.payload,
                    quantity: 1,
                    totalPrice: action.payload.price, 
                };
                state.products.push(newProduct);
            }
            else {
                
                existingProduct.quantity += 1; 
                existingProduct.totalPrice = existingProduct.price * existingProduct.quantity; 
            } 
            state.totalPrice = state.products.reduce((total, product) => total + product.totalPrice, 0);
            localStorage.setItem("cartList", JSON.stringify(state)); 
        },

        
        removeProductFromCart: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
            localStorage.setItem("cartList", JSON.stringify(state)); 
        },

        
        clearCart: (state) => {
            state.products = [];
            localStorage.removeItem("cartList"); 
        },
    },
});


export const { addToCart, removeProductFromCart, clearCart } = cartListSlice.actions;
export default cartListSlice.reducer;
