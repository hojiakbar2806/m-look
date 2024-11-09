"use client";

import { combineReducers } from 'redux';
import authReducer from "./feature/authSlice"
import cartReducer from './feature/cartSlice';
import { configureStore } from '@reduxjs/toolkit';
import wishListReducer from './feature/wishListSlice';
import navbarHeightReducer from './feature/navbarState';


const rootReducer = combineReducers({
    auth:authReducer,
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
