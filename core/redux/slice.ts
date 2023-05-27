import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Checklist, Checklists, PlaceFilters } from "core/types";

import checklistsData from "./checklists.json";

export type CoreState = {
	sidebarVisibility: boolean;
	checklistsData: Checklists;
	currentChecklist: Checklist | null;
	filters: PlaceFilters | null;
}

const initialState: CoreState = {
	sidebarVisibility: false,
	checklistsData: checklistsData,
	currentChecklist: null,
	filters: null,
};

export const coreSlice = createSlice({
	name: "core",
	initialState,
	reducers: {
		toggleSidebarVisibility: (state) => {
			state.sidebarVisibility = !state.sidebarVisibility;
		},
		setCurrentChecklist: (state, action: PayloadAction<Checklist>) => {
			state.currentChecklist = action.payload;
		},

		setFilters: (state, action: PayloadAction<PlaceFilters>) => {
			state.filters = action.payload;
		},
	},
});

export const {
	toggleSidebarVisibility,
	setCurrentChecklist,
	setFilters,
} = coreSlice.actions;
export default coreSlice.reducer;
