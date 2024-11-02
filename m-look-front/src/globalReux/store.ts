// store.ts
"use client";

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import cartReducer from './feature/cartSlice';
import wishListReducer from './feature/wishListSlice';
import navbarHeightReducer from './feature/navbarState';


const rootReducer = combineReducers({
    cart: cartReducer, 
    wishList: wishListReducer,
    navbarHeight: navbarHeightReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
