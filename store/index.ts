"use client";

import { configureStore } from "@reduxjs/toolkit";

import { coreReducer } from "core/redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
	devTools: process.env.NODE_ENV !== "production",
	reducer: {
		core: coreReducer,
	},
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
