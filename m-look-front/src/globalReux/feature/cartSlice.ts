import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartProduct, IProduct } from 'src/interface/product';

interface Cart {
    products: ICartProduct[];
    totalPrice: number;
}

interface CartProducts {
    cart: Cart;
    cartDialogState: 'open' | 'close'; 
}

const getInitialCartItems = (): CartProducts => {
    if (typeof window !== "undefined" && localStorage.getItem("cartList")) {
        try {
            const storedCart = JSON.parse(localStorage.getItem("cartList")!);
            return {
                cart: storedCart || {
                    products: [],
                    totalPrice: 0,
                },
                cartDialogState: "close", 
            };
        } catch (e) {
            console.error("Could not parse cart list from localStorage", e);
            return {
                cart: {
                    products: [],
                    totalPrice: 0,
                },
                cartDialogState: 'close',
            };
        }
    }
    return {
        cart: {
            products: [],
            totalPrice: 0,
        },
        cartDialogState: 'close',
    };
};

const initialState: CartProducts = getInitialCartItems();

const cartListSlice = createSlice({
    name: 'cartList',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProduct>) => {
            const existingProduct = state.cart.products.find(product => product.id === action.payload.id);
            if (!existingProduct) {
                const newProduct: ICartProduct = {
                    ...action.payload,
                    quantity: 1,
                    totalPrice: action.payload.price,
                };
                state.cart.products.push(newProduct);
            } else {
                existingProduct.quantity += 1;
                existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
            }
            state.cart.totalPrice = state.cart.products.reduce((total, product) => total + product.totalPrice, 0);
            localStorage.setItem("cartList", JSON.stringify(state.cart));  // Save only cart state
        },

        increment: (state, action: PayloadAction<number>) => {
            const existingProduct = state.cart.products.find(product => product.id === action.payload);
            if (existingProduct) {
                existingProduct.quantity += 1;
                existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
            }
            state.cart.totalPrice = state.cart.products.reduce((total, product) => total + product.totalPrice, 0);
            localStorage.setItem("cartList", JSON.stringify(state.cart));  // Save only cart state
        },

        decrement: (state, action: PayloadAction<number>) => {
            const existingProduct = state.cart.products.find(product => product.id === action.payload);
            if (existingProduct) {
                if (existingProduct.quantity > 1) {
                    existingProduct.quantity -= 1;
                    existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
                } else {
                    state.cart.products = state.cart.products.filter(product => product.id !== action.payload);
                }
            }
            state.cart.totalPrice = state.cart.products.reduce((total, product) => total + product.totalPrice, 0);
            localStorage.setItem("cartList", JSON.stringify(state.cart));  // Save only cart state
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cart.products = state.cart.products.filter(product => product.id !== action.payload);
            state.cart.totalPrice = state.cart.products.reduce((total, product) => total + product.totalPrice, 0);
            localStorage.setItem("cartList", JSON.stringify(state.cart));  // Save only cart state
        },

        clearCart: (state) => {
            state.cart.products = [];
            state.cart.totalPrice = 0;  // Total price should also be reset
            localStorage.removeItem("cartList");  // Clear cart from localStorage
        },

        closeCartDialog: (state) => {
            if (state.cartDialogState === 'open' && typeof window !== "undefined") {
                state.cartDialogState = 'close';
                document.body.classList.remove("overflow-hidden");
            }
        },

        openCartDialog: (state) => {
            if (state.cartDialogState === 'close' && typeof window !== "undefined") {
                state.cartDialogState = 'open';
                document.body.classList.add("overflow-hidden");
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, increment, decrement, closeCartDialog, openCartDialog } = cartListSlice.actions;
export default cartListSlice.reducer;
